import { InferInput, minValue, nonEmpty, number, object, pipe, string } from "valibot";

export const inventorySchema = object({
  productId: pipe(
    string("The product ID must be a string"),
    nonEmpty("Please enter a product ID"),
  ),
  quantity_available: pipe(
    number("The quantity available must be an integer"),
    minValue(0, "The quantity available must be greater or equal than 0"),
  ),
  quantity_reserved: pipe(
    number("The quantity reserved must be an integer"),
    minValue(0, "The quantity reserved must be greater or equal than 0"),
  ),
  restock_date: pipe(
    string("The restock date must be a string"),
    nonEmpty("Please enter a restock date"),
  ),
});

export type InventoryForm = InferInput<typeof inventorySchema>;
