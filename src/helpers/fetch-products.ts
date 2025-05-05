import { isServer } from "solid-js/web";

export const fetchProducts = async () => {
  try {
    const baseUrl = isServer ? process.env.BASE_URL : "";
    const res = await fetch(`${ baseUrl }/api/products`);
    
    if (!res.ok) {
      throw new Error(`Failed to load products: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
    throw err;
  }
};
