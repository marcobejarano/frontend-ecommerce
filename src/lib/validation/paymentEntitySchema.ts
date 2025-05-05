import { email, minValue, nonEmpty, nullable, number, object, optional, picklist, pipe, string, transform } from "valibot";

export const paymentEntitySchema = object({
  id: pipe(
    string("The id name must be a string"),
    nonEmpty("Please enter an ID"),
  ),
  order_id: pipe(
    string("The order ID must be a string"),
    nonEmpty("Please enter an order ID"),
  ),
  status: pipe(
    picklist(["approved", "rejected"], "Please select only one of the list"),
  ),
  transaction_amount: pipe(
    number("The amount must be a number"),
    minValue(0.01, "The amount must be greater than 0"),
    transform((value) => Number(value.toFixed(2))),
  ),

  payer_id_type: optional(string("The payer ID type must be a string")),
  payer_id_number: optional(string("The payer ID number must be a string")),
  payer_email: nullable(pipe(string(), email())),

  payment_method_id: pipe(
    string("The payment method ID must be a string"),
    nonEmpty("Please enter a payment method ID"),
  ),
  payment_type_id: pipe(
    string("The payment type ID must be a string"),
    nonEmpty("Please enter a payment type ID"),
  ),
  installments: pipe(
    number("The installments must be a number"),
    minValue(1, "The amount must be equal or greater than 1"),
  ),
  last_four_digits: pipe(
    string("The last four digits of the card must be a string"),
    nonEmpty("Please enter the last four digits of the card"),
  ),
  
  date_approved: optional(string("The creation date must be a string")),
});
