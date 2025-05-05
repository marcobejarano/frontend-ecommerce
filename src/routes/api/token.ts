import { getTokenPayloadFromRequest } from "@/lib/auth/get-token-payload-from-request";
import { APIEvent } from "@solidjs/start/server";

export const GET = async ({ request }: APIEvent) => {
  const tokenPayload = await getTokenPayloadFromRequest(request);

  return new Response(JSON.stringify(tokenPayload));
};
