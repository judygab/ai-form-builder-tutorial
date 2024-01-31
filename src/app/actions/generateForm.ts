"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { saveForm } from "./mutateForm";

export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(1),
  });
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.log(parse.error);
    return {
      message: "Failed to parse data",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "No OpenAI API key found",
    };
  }

  const data = parse.data;
  const promptExplanation =
    "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${data.description} ${promptExplanation}`,
          },
        ],
      }),
    });
    const json = await response.json();

    const responseObj = JSON.parse(json.choices[0].message.content);

    const dbFormId = await saveForm({
      name: responseObj.name,
      description: responseObj.description,
      questions: responseObj.questions,
    });

    revalidatePath("/");
    return {
      message: "success",
      data: { formId: dbFormId },
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Failed to create form",
    };
  }
}
