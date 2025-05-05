import { isServer } from "solid-js/web";

export const fetchTokenPayload = async () => {
  const baseUrl = isServer ? process.env.BASE_URL : "";
  const res = await fetch(`${ baseUrl }/api/token`);
  if (!res.ok) throw new Error("Failed to get the token payload");
  return res.json();
};
