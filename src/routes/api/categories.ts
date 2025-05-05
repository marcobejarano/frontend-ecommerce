import { db } from "@/db";
import { categories } from "@/db/schema";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";

export const GET = async () => {
  const allCategories = await db.select().from(categories);
  
  return new Response(JSON.stringify(allCategories), {
    status: 200,
  });
};

export const POST = async ({ request }: APIEvent) => {
  const { name } = await request.json();

  const [category] = await db.select().from(categories).where(eq(categories.name, name));
  if (category) {
    return new Response(JSON.stringify({ error: "Category already created"}));
  }

  const categoryId = crypto.randomUUID();

  await db.insert(categories).values({
    id: categoryId,
    name,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
