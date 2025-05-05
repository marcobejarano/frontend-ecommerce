import { parse } from "cookie";
import { verifyToken } from "./token";

export const getTokenPayloadFromRequest = async (request: Request) => {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const { token } = parse(cookieHeader);

  console.log("Parsed token:", token); 

  if (!token) return null;

  try {
    const payload = verifyToken(token);
    console.log("Payload is:", payload);
    return payload
  } catch {
    return null;
  }
};
