import { MercadoPagoConfig, Payment } from "mercadopago";
import type { APIEvent } from "@solidjs/start/server";

export const POST = async ({ request }: APIEvent) => {
  const reqBody = await request.json();
  const idempotencyKey = request.headers.get("X-Idempotency-Key");

  console.log("reqBody is:", reqBody);

  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN,
  });

  const payment = new Payment(client);

  const body = {
    transaction_amount: reqBody.transaction_amount,
    token: reqBody.token,
    description: reqBody.description,
    installments: reqBody.installments,
    payment_method_id: reqBody.payment_method_id,
    issuer_id: reqBody.issuer_id,
    payer: {
      email: reqBody.payer.email,
      identification: {
        type: reqBody.payer.identification.type,
        number: reqBody.payer.identification.number,
      },
    },
  };

  console.log("The body is:", body);

  const requestOptions = {
    idempotencyKey: `payment${ idempotencyKey }`
  }

  try {
    const res = await payment.create({ body, requestOptions });
    console.log("The response from Mercado Pago:", res);
    return new Response(JSON.stringify(res), {
      status: 201,
    });
  } catch (err) {
    console.error("Error found during payment processing:", err);
  }
};
