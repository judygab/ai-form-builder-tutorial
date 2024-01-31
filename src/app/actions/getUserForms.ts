"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { forms } from "@/db/schema";
import { auth } from "@/auth";

export async function getUserForms() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return [];
  }

  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId),
  });
  return userForms;
}
