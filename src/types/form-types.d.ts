import { InferSelectModel } from "drizzle-orm";
import { forms, questions, fieldOptions } from "@/db/schema";

export type FormSelectModel = InferSelectModel<typeof forms>;
export type QuestionSelectModel = InferSelectModel<typeof questions>;
export type FieldOptionSelectModel = InferSelectModel<typeof fieldOptions>;
