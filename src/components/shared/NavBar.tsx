import { A } from "@solidjs/router"
import Nav from "./Nav"
import { useCart } from "@/stores/cart-store";

const NavBar = () => {
  const cart = useCart();

  return (
    <div class="px-10 flex justify-between items-center bg-blue-400">
      <img
        src="/images/guinea-pigs-store-transparent.png"
        alt="Guinea Pigs Store Logo"
        class="w-16"
      />
      <Nav />
      <div class="flex gap-4 items-center">
        <A href="/login" class="text-center">
          <img
            src="/images/log-in.png"
            alt="https://www.flaticon.com/free-icons/log-in"
            class="w-8 mx-auto"
          />
          <div>Log In</div>
        </A>
        <A href="/cart" class="flex justify-center items-center">
          <div>
            <img
              src="/images/shopping-cart.png"
              alt="https://www.flaticon.com/free-icons/smart-cart"
              class="w-8 mx-auto"
            />
            <div>Cart</div>
          </div>
          <div class="w-8 h-8 flex items-center justify-center rounded-full m-2 bg-green-600">{ cart?.items?.length }</div>
        </A>
      </div>
    </div>
  );
};

export default NavBar;
