import React from 'react'
import { getUserForms } from '@/app/actions/getUserForms'
import { InferSelectModel } from 'drizzle-orm'
import { forms } from '@/db/schema'
import FormsPicker from './FormsPicker'
import ResultsDisplay from './ResultsDisplay'

type Props = {}

const page = async ({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {
  const userForms: Array<InferSelectModel<typeof forms>> = await getUserForms();

  if (!userForms?.length || userForms.length === 0) {
    return (
      <div>No forms found</div>
    )
  }

  const selectOptions = userForms.map((form) => {
    return {
      label: form.name,
      value: form.id
    }
  })

  return (
    <div>
      <FormsPicker options={selectOptions} />
      <ResultsDisplay
        formId={searchParams?.formId ? parseInt(searchParams.formId as string) : userForms[0].id} />
    </div>
  )
}

export default page