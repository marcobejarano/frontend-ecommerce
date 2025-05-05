import { db } from "@/db";
import { products } from "@/db/schema";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const GET = async ({ params }: APIEvent) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing product ID" }), {
      status: 400,
    });
  }

  const [product] = await db.select().from(products).where(eq(products.id, id));

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
  });
};
