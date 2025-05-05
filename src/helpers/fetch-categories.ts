import { isServer } from "solid-js/web";

export const fetchCategories = async () => {
  const baseUrl = isServer ? process.env.BASE_URL : "";
  const res = await fetch(`${ baseUrl }/api/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
};
