import { InferInput, minLength, minValue, nonEmpty, number, object, pipe, string, transform } from "valibot";

export const productSchema = object({
  name: pipe(
    string("The product name must be a string"),
    nonEmpty("Please enter a product name"),
    minLength(3, "Product name must be at least 3 characters long"),
  ),
  categoryId: pipe(
    string("The category ID must be a string"),
    nonEmpty("Please enter a category ID"),
  ),
  price: pipe(
    number("The price must be a number"),
    minValue(0.01, "Price must be greater than 0"),
    transform((value) => Number(value.toFixed(2))),
  ),
  imageUrl: pipe(
    string("The image URL must be a string"),
    nonEmpty("Please enter an image URL"),
  ),
  description: pipe(
    string("The description must be a string"),
    nonEmpty("Please enter a description of the product"),
  ),
});

export type ProductForm = InferInput<typeof productSchema>;
