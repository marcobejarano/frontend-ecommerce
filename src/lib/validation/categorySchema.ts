import { InferInput, minLength, nonEmpty, object, pipe, string } from "valibot";

export const categorySchema = object({
  name: pipe(
    string("The category name must be a string"),
    nonEmpty("Please enter a category name"),
    minLength(3, "Category name must be at least 3 characters long"),
  ),
});

export type CategoryForm = InferInput<typeof categorySchema>;
