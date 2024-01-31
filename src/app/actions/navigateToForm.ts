"use server";

import { redirect } from "next/navigation";

export async function navigate(id: number) {
  redirect(`/forms/edit/${id}`);
}
