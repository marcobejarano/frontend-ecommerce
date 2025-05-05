import { array, object } from "valibot";
import { orderEntitySchema } from "./orderEntitySchema";
import { orderItemEntitySchema } from "./orderItemEntitySchema";

export const orderRequestSchema = object({
  orderEntity: orderEntitySchema,
  orderItemsEntities: array(orderItemEntitySchema),
});
