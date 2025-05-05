import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { orderRequestSchema } from "@/lib/validation/orderRequestSchema";
import type { APIEvent } from "@solidjs/start/server";
import { parse } from "valibot";

export const POST = async ({ request }: APIEvent) => {
  const body = await request.json();

  const { orderEntity, orderItemsEntities } = parse(orderRequestSchema, body);

  await db.insert(orders).values(orderEntity);

  await db.insert(orderItems).values(orderItemsEntities);

  return new Response(JSON.stringify(orderEntity), {
    status: 201,
  });
};
