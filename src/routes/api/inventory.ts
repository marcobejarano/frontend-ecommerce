import { db } from "@/db"
import { inventory } from "@/db/schema"
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const POST = async ({ request }: APIEvent) => {
  const { productId, quantity_available, quantity_reserved, restock_date } = await request.json();

  const [productInventory] = await db.select().from(inventory).where(eq(inventory.productId, productId));
  if (productInventory) {
    return new Response(JSON.stringify({ error: "Inventory already created" }));
  }

  const id = crypto.randomUUID();

  await db.insert(inventory).values({
    id,
    productId,
    quantity_available,
    quantity_reserved,
    restock_date,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
