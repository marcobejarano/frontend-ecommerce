import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fetchInventoryByProductId } from "@/helpers/fetch-inventory-by-product-id";
import { cartToOrderMapper } from "@/mappers/cart-to-order-mapper";
import { addOneUnitToCart, removeOneUnitFromCart, useCart } from "@/stores/cart-store";
import { CartItem } from "@/types/cart";
import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";

const Cart = () => {
  const cart = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item: CartItem) => {
    addOneUnitToCart(item.product);
  };

  const handleRemoveFromCart = (item: CartItem) => {
    removeOneUnitFromCart(item.product);
  };

  const handleLogInRedirection = () => {
    navigate("/login");
  };

  const handlePaymentRedirection = async () => {
    try {
      const items = cart.items;
      items.map(async (item) => {
        const productInventory = await fetchInventoryByProductId(item.product.id);
        const available_quantity = productInventory?.quantity_available ?? 0;
      
        const currentQuantity = item.quantity ?? 0;
      
        if (currentQuantity > available_quantity) {
          alert(`Not enough stock available. There are ${ currentQuantity - available_quantity } missing items in stock currently`);
          return;
        }
      });

      items.map(async (item) => {
        const res = await fetch(`/api/inventory/${ item.product.id }`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity }),
        });

        if (!res.ok) {
          console.log('Error is:', res.text());
          const err = await res.json();
          throw new Error(err.message);
        }
      });

      const { orderEntity, orderItemsEntities } = cartToOrderMapper(cart);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderEntity, orderItemsEntities }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const data = await res.json();
      navigate(`/checkout?order_id=${ data.id }&total_price=${ data.totalPrice }`);
    } catch (err) {
      console.error("Error during order creation:", err);
    }
  };

  return (
    <section class="p-10 space-y-4 text-center text-white bg-green-600">
      <h1>Welcome to the cart section!</h1>
      <p>Here you will add and remove the number of your chosen baby and/or adult guinea pigs</p>
      <Show when={ cart?.items?.length } fallback={ <p>Currently there are no items in the cart.</p> }>
        <Table>
          <TableCaption>A list of the items of your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="text-center">Item</TableHead>
              <TableHead class="text-center">Product</TableHead>
              <TableHead class="text-center">Quantity</TableHead>
              <TableHead class="text-center">Unit Price</TableHead>
              <TableHead class="text-center">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={ cart.items }>
              { (item, index) => (
                <TableRow>
                  <TableCell>{ index() + 1 }</TableCell>
                  <TableCell>{ item.product.name }</TableCell>
                  <TableCell class="flex justify-center items-center gap-2">
                    <Button onClick={ () => handleAddToCart(item) }>+</Button>
                    <div>{ item.quantity }</div>
                    <Button onClick={ () => handleRemoveFromCart(item) }>-</Button>
                  </TableCell>
                  <TableCell>S/. { item.price }</TableCell>
                  <TableCell>S/. { item.quantity * item.price }</TableCell>
                </TableRow>
              ) }
            </For>
            <TableRow class="font-bold">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>S/. { cart.totalPrice }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                {
                  cart.userId === null ?
                  <Button onClick={ handleLogInRedirection }>Please Log In Before Continuing</Button> :
                  <Button onClick={ handlePaymentRedirection }>Proceed to Pay</Button>
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Show>
    </section>
  );
};

export default Cart;
