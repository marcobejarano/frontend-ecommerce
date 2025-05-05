import { db } from "@/db";
import { orders } from "@/db/schema";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const PATCH = async ({ request, params }: APIEvent) => {
  const { id } = params;
  const { status } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing order ID" }), {
      status: 400,
    });
  }

  const validStatuses = ["pending", "paid", "shipped", "delivered"];
  if (!status || !validStatuses.includes(status)) {
    return new Response(JSON.stringify({ error: "Invalid or missing status" }));
  }

  const [order] = await db.select().from(orders).where(eq(orders.id, id));
  
  if (!order) {
    return new Response(JSON.stringify({ error: "Order not found" }), {
      status: 404,
    });
  }

  const updatedAt = new Date().toISOString();

  try {
    await db.update(orders).set({ status, updatedAt }).where(eq(orders.id, id));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error updating error status:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
