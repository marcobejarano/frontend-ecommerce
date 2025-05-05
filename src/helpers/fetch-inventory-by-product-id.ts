import { isServer } from "solid-js/web";

export const fetchInventoryByProductId = async (productId: string) => {
  try {
    const baseUrl = isServer ? process.env.BASE_URL : "";
    const res = await fetch(`${ baseUrl }/api/inventory/${productId}`);
    if (!res.ok) throw new Error("No inventory found");
    return await res.json();
  } catch {
    return null;
  }
};
