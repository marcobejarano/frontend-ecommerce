import { minValue, nonEmpty, number, object, pipe, string, transform } from "valibot";

export const orderItemEntitySchema = object({
  id: pipe(
    string("The id name must be a string"),
    nonEmpty("Please enter an ID"),
  ),
  orderId: pipe(
    string("The order ID must be a string"),
    nonEmpty("Please enter an order ID"),
  ),
  productId: pipe(
    string("The product ID must be a string"),
    nonEmpty("Please enter a product ID"),
  ),
  quantity: pipe(
    number("The quantity must be an integer"),
    minValue(0, "Price must be greater or equal than 0"),
  ),
  price: pipe(
    number("The price must be a number"),
    minValue(0.01, "Price must be greater than 0"),
    transform((value) => Number(value.toFixed(2))),
  ),
});
