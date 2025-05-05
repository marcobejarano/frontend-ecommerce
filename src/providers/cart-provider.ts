import { cartStore, setCartStore } from "@/stores/cart-store";
import { JSX, createEffect, onCleanup } from "solid-js";

const CartProvider = (props: { children: JSX.Element }) => {
  // Load from localStorage on mount
  createEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCartStore(JSON.parse(savedCart));
        } catch (err) {
          console.error("Failed to parse cart from localStorage", err);
        }
      }

      // Listen for localStorage changes from other tabs
      const syncCart = (event: StorageEvent) => {
        if (event.key === "cart" && event.newValue) {
          try {
            const newCart = JSON.parse(event.newValue);
            setCartStore(newCart);
          } catch (err) {
            console.error("Failed to sync cart from storage", err);
          }
        }
      };

      window.addEventListener("storage", syncCart);

      onCleanup(() => {
        window.removeEventListener("storage", syncCart);
      });
    }
  });

  // Persist to localStorage on changes
  createEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartStore));
    }
  });

  return props.children;
};

export default CartProvider;
