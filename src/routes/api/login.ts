import type { APIEvent } from "@solidjs/start/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/auth/hash";
import { createToken } from "@/lib/auth/token";

export const POST = async ({ request }: APIEvent) => {
  const { email, password } = await request.json();

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const valid = await verifyPassword(user.hashedPassword, password);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const now = new Date();
  const nowString = now.toISOString();
  const exp = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

  const token = createToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: nowString,
    nbf: nowString,
    exp,
  });

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
    },
  });
};
