import { Product } from '@/db/schema';
import { fetchInventoryByProductId } from '@/helpers/fetch-inventory-by-product-id';
import { fetchUserId } from '@/helpers/fetch-user-id';
import { Cart, CartItem } from '@/types/cart';
import { createStore } from 'solid-js/store';

export const initialCart: Cart = {
  id: crypto.randomUUID(),
  userId: null,
  items: [],
  totalPrice: 0,
  totalItems: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const [cartStore, setCartStore] = createStore<Cart>(initialCart);
export const useCart = () => cartStore;

export const addToCart = async (product: Product) => {
  const current = cartStore;
  const userId = await fetchUserId();

  const exists = current.items.some((item) => item.id === product.id);
  if (exists) return;

  const updatedItems: CartItem[] = [
    ...current.items,
    {
      id: product.id,
      product,
      quantity: 1,
      price: product.price,
    },
  ];

  const newCart: Cart = {
    ...current,
    userId,
    items: updatedItems,
    totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    updatedAt: new Date().toISOString(),
  };

  setCartStore(newCart);
};

export const removeFromCart = async (product: Product) => {
  const current = cartStore;
  const userId = await fetchUserId();

  const updatedItems = current.items.filter((item) => item.id !== product.id);

  const newCart: Cart = {
    ...current,
    userId,
    items: updatedItems,
    totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    updatedAt: new Date().toISOString(),
  };

  setCartStore(newCart)
};

export const addOneUnitToCart = async (product: Product) => {
  const current = cartStore;
  const userId = await fetchUserId();

  const inventory = await fetchInventoryByProductId(product.id);
  const available = inventory?.quantity_available ?? 0;

  const existingItem = current.items.find((item) => item.product.id === product.id);
  const currentQty = existingItem?.quantity ?? 0;

  if (currentQty + 1 > available) {
    alert("Not enough stock available.");
    return;
  }

  let updatedItems: CartItem[];

  const index = current.items.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    updatedItems = current.items.map((item, i) =>
      i === index
        ? {
          ...item,
          quantity: item.quantity + 1,
        }
        : item
    );
  } else {
    updatedItems = [
      ...current.items,
      {
        id: product.id,
        product,
        quantity: 1,
        price: product.price,
      }
    ];
  }

  const newCart: Cart = {
    ...current,
    userId,
    items: updatedItems,
    totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    updatedAt: new Date().toISOString(),
  };

  setCartStore(newCart);
}

export const removeOneUnitFromCart = async (product: Product) => {
  const current = cartStore;
  const userId = await fetchUserId();

  let updatedItems = current.items
    .map((item) =>
      item.id === product.id
        ? {
          ...item,
          quantity: item.quantity - 1
        }
        : item
    )
    .filter((item) => item.quantity > 0);

  const newCart: Cart = {
    ...current,
    userId,
    items: updatedItems,
    totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    updatedAt: new Date().toISOString(),
  };

  setCartStore(newCart);
}
