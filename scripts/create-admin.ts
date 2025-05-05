import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth/hash";
import { eq } from "drizzle-orm";

const createAdmin = async () => {
  const email = "admin@hotmail.com";
  const password = "Admin123";

  const existingAdmin = await db.select().from(users).where(eq(users.email, email));
  if (existingAdmin.length > 0) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await hashPassword(password);
  const userId = crypto.randomUUID();

  await db.insert(users).values({
    id: userId,
    email,
    hashedPassword,
    role: "admin",
    createdAt: new Date().toISOString(),
  });

  console.log("Admin created successfully.");
}

try {
  await createAdmin();
} catch (err) {
  console.error("Error creating admin:", err);
}

// Run this script with the command:
// bun scripts/create-admin.ts
// To login as admin, use the email and password defined above:
// xh POST localhost:3000/api/login email=admin@hotmail.com password=Admin123
