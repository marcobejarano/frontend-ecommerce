import { isServer } from "solid-js/web";

export const fetchProductById = async (id: string) => {
  const baseUrl = isServer ? process.env.BASE_URL : "";
  const res = await fetch(`${ baseUrl }/api/products/${ id }`);
  if (!res.ok) throw new Error("Failed to load product by ID");
  return res.json();
}