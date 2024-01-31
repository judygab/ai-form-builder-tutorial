import { db } from "@/db";
import {
  forms,
  formSubmissions,
  answers as dbAnswers,
} from "@/db/schema";

export async function POST(
  request: Request
): Promise<Response> {
  const data = await request.json();

  const newFormSubmission = await db
    .insert(formSubmissions)
    .values({
      formId: data.formId,
    })
    .returning({
      insertedId: formSubmissions.id,
    });
  const [{ insertedId }] =
    newFormSubmission;

  await db.transaction(async (tx) => {
    for (const answer of data.answers) {
      const [{ answerId }] = await tx
        .insert(dbAnswers)
        .values({
          formSubmissionId: insertedId,
          ...answer,
        })
        .returning({
          answerId: dbAnswers.id,
        });
    }
  });

  return Response.json(
    { formSubmissionsId: insertedId },
    { status: 200 }
  );
}
