import React from 'react'
import { Table } from './Table'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { forms } from '@/db/schema'

type Props = {
  formId: number
}

const ResultsDisplay = async ({ formId }: Props) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true
        }
      },
      submissions: {
        with: {
          answers: {
            with: {
              fieldOption: true
            }
          }
        }
      }
    }
  })

  if (!form) return null;
  if (!form.submissions) return <p>No submissions on this form yet!</p>;
  console.log('form', form);
  return (
    <div>
      <Table
        data={form.submissions}
        columns={form.questions}
      />
    </div>
  )
}

export default ResultsDisplay