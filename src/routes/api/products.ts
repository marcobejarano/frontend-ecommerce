import { db } from "@/db"
import { products } from "@/db/schema"
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const GET = async () => {
  const allProducts = await db.select().from(products);
  
  return new Response(JSON.stringify(allProducts), {
    status: 200,
  });
};

export const POST = async ({ request }: APIEvent) => {
  const { name, categoryId, price, imageUrl, description } = await request.json();

  const [product] = await db.select().from(products).where(eq(products.name, name));
  if (product) {
    return new Response(JSON.stringify({ error: "Product already created" }));
  }

  const productId = crypto.randomUUID();

  await db.insert(products).values({
    id: productId,
    name,
    categoryId,
    price,
    imageUrl,
    description,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
