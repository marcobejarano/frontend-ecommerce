import { db } from "@/db";
import { inventory } from "@/db/schema";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const GET = async ({ params }: APIEvent) => {
  const { productId } = params;

  if (!productId) {
    return new Response(JSON.stringify({ error: "Missing product ID" }), {
      status: 400,
    });
  }
  
  const [productInventory] = await db.select().from(inventory).where(eq(inventory.productId, productId));

  if (!productInventory) {
    return new Response(JSON.stringify({ error: "Product inventory not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(productInventory), {
    status: 200,
  });
};

export const PATCH = async ({ request, params }: APIEvent) => {
  const { productId } = params;
  const { quantity } = await request.json();

  if (!productId) {
    return new Response(JSON.stringify({ error: "Missing product ID" }), {
      status: 400,
    });
  }

  if (!quantity) {
    return new Response(JSON.stringify({ error: "Missing quantity of the inventory" }), {
      status: 400,
    });
  }

  const [productInventory] = await db.select().from(inventory).where(eq(inventory.productId, productId));
  
  const quantity_available = productInventory.quantity_available - quantity;
  const quantity_reserved = productInventory.quantity_reserved + quantity;

  if (quantity_available < 0) {
    return new Response(JSON.stringify({ error: "Quantity available is not enough" }), {
      status: 400,
    });
  }

  try {
    await db.update(inventory).set({ quantity_available, quantity_reserved }).where(eq(inventory.productId, productId));
  
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error updating inventory:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
