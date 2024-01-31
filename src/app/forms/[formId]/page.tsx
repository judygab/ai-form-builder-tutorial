import React from 'react'
import { db } from '@/db';
import { forms } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import Form from '../Form';


const page = async ({ params }: {
  params: {
    formId: string
  }
}) => {
  const formId = params.formId;

  if (!formId) {
    return <div>Form not found</div>
  };

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, parseInt(formId)),
    with: {
      questions: {
        with: {
          fieldOptions: true
        }
      }
    }
  })

  if (!form) {
    return <div>Form not found</div>
  }

  return (
    <Form form={form} />
  )
}
export default page;