import { minValue, nonEmpty, number, object, picklist, pipe, string, transform } from "valibot";

export const orderEntitySchema = object({
  id: pipe(
    string("The id name must be a string"),
    nonEmpty("Please enter an ID"),
  ),
  userId: pipe(
    string("The user ID must be a string"),
    nonEmpty("Please enter a user ID"),
  ),
  totalPrice: pipe(
    number("The total price must be a number"),
    minValue(0.01, "Total price must be greater than 0"),
    transform((value) => Number(value.toFixed(2))),
  ),
  status: pipe(
    picklist(["pending", "paid", "shipped", "delivered"], "Please select only one of the list"),
  ),
  createdAt: pipe(
    string("The creation date must be a string"),
    nonEmpty("Please enter a creation date"),
  ),
  updatedAt: pipe(
    string("The updated date must be a string"),
    nonEmpty("Please enter an updated date"),
  ),
});
