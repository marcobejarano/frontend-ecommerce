import { db } from "@/db";
import { payments } from "@/db/schema";
import { paymentEntitySchema } from "@/lib/validation/paymentEntitySchema";
import type { APIEvent } from "@solidjs/start/server";
import { parse } from "valibot";

export const POST = async ({ request }: APIEvent) => {
  const url = new URL(request.url);
  const order_id = url.searchParams.get("order_id");

  console.log('order_id:', order_id);

  const {
    id,
    status,
    transaction_amount,
    payer,
    payment_method_id,
    payment_type_id,
    installments,
    card,
    date_approved
  } = await request.json();
  
  const body = {
    id: String(id),
    order_id,
    status,
    transaction_amount,
    payer_id_type: payer?.identification?.type ?? '',
    payer_id_number: payer?.identification?.number ?? '',
    payer_email: payer?.email || null,
    payment_method_id,
    payment_type_id,
    installments,
    last_four_digits: card.last_four_digits,
    date_approved: date_approved ?? '',
  }

  console.log('Body is:', body);

  let paymentEntity;

  try {
    paymentEntity = parse(paymentEntitySchema, body);
    console.log('Payment:', paymentEntity);
  } catch (err) {
    console.error("Validation error:", err);
    return new Response(JSON.stringify({ error: "Invalid payment data" }), {
      status: 400,
    });
  }

  await db.insert(payments).values(paymentEntity);

  return new Response(JSON.stringify({ sucess: true }), {
    status: 201,
  });
};
