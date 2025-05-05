import { Cart } from "@/types/cart";

export const cartToOrderMapper = (cart: Cart) => {
  const orderId = crypto.randomUUID();

  const orderEntity = {
    id: orderId,
    userId: cart.userId,
    totalPrice: cart.totalPrice,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const orderItemsEntities = cart.items.map((item) => {
    return {
      id: crypto.randomUUID(),
      orderId,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.price,
    }
  });

  return { orderEntity, orderItemsEntities }
};
