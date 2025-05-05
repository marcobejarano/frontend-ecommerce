import { isServer } from "solid-js/web";

export const fetchUserId = async () => {
  const baseUrl = isServer ? process.env.BASE_URL : "";
  const res = await fetch(`${ baseUrl }/api/token`);
  const data = await res.json();
  return data?.sub ?? null;
};
