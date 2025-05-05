import type { APIEvent } from "@solidjs/start/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth/hash";

export const POST = async ({ request }: APIEvent) => {
  const { email, password } = await request.json();

  const hashedPassword = await hashPassword(password);
  const userId = crypto.randomUUID();

  await db.insert(users).values({
    id: userId,
    email,
    hashedPassword,
    role: "customer",
    createdAt: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
