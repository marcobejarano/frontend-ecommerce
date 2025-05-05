import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format-day";
import { useSearchParams } from "@solidjs/router";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { createSignal, onMount, Show } from "solid-js";

const Invoice = () => {
  const [searchParams] = useSearchParams();
  const { payment_id, order_id } = searchParams;

  const [paymentData, setPaymentData] = createSignal<PaymentResponse | null>(null);

  onMount(async () => {
    if (payment_id) {
      try {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${ payment_id }`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN }`,
          },
        });

        if (!res.ok) {
          console.error("Error fetching payment data:", res.statusText);
        }

        const data = await res.json();
        setPaymentData(data);

        try {
          const res = await fetch(`/api/payments?order_id=${ order_id }`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const text = await res.text();
            console.log('Text is:', text);
          }
        } catch (err) {
          console.error("Error creating the payment:", err);
        }

        if (data.status === "approved" && order_id) {
          console.log("Data is:", data);
          try {
            await fetch(`/api/orders/${ order_id }`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: "paid" }),
            });
          } catch (err) {
            console.error("Error updating order status:", err);
          }
        }
      } catch (err) {
        console.error("Error during fetching:", err);
      }
    }
  });

  return (
    <div class="flex flex-col justify-center items-center p-10 bg-green-600">
      <Show when={ paymentData() } fallback={ 
        <div class="flex flex-col justify-center items-center min-h-min bg-blue-700">
          Loading...
        </div>
      }>
        <h2 class="mb-2 text-lg font-bold">
          {paymentData()?.status === "approved" ? "Payment Successful" : "Payment Failed"}
        </h2>
        <p><strong>Payment ID:</strong> {paymentData()?.id}</p>
        <p><strong>Order ID:</strong> {order_id}</p>
        <p><strong>Status:</strong> {paymentData()?.status}</p>
        <p><strong>Transaction Amount:</strong> {paymentData()?.transaction_amount} PEN</p>
        <p><strong>Payer ID type:</strong> {paymentData()?.payer?.identification?.type}</p>
        <p><strong>Payer ID number:</strong> {paymentData()?.payer?.identification?.number}</p>
        <p><strong>Payer Email:</strong> {paymentData()?.payer?.email}</p>
        <p><strong>Payment Method:</strong> {paymentData()?.payment_method_id}</p>
        <p><strong>Payment Type:</strong> {paymentData()?.payment_type_id}</p>
        <p><strong>Payment Card:</strong> ...{paymentData()?.card?.last_four_digits}</p>
        <p><strong>Installments:</strong> {paymentData()?.installments}</p>
        <p><strong>Date Created:</strong> {formatDate(paymentData()?.date_created!)}</p>
        <Button
          onClick={() => window.print()}
          
        >
          Print Invoice
        </Button>
      </Show>
    </div>
  );
};

export default Invoice;
