import { generateKeys, sign, verify } from "paseto-ts/v4";
import { TokenPayload } from "@/types/token-payload";

const { secretKey, publicKey } = generateKeys('public');
console.log("Public Key:", publicKey);
console.log("Secret Key:", secretKey);

export const createToken = (tokenPayload: TokenPayload) => {
  try {
    const token = sign(secretKey, tokenPayload)
    return token;
  } catch (err) {
    console.error("Error creating token:", err);
    throw new Error("Token creation failed");
  }
};

export const verifyToken = (token: string) => {
  try {
    const { payload } = verify(publicKey, token);
    return payload as TokenPayload;
  } catch (err) {
    console.error("Error verifying token:", err);
    throw new Error("Token verification failed");
  }
};
