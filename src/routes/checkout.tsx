import { fetchUserId } from "@/helpers/fetch-user-id";
import { setCartStore } from "@/stores/cart-store";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";

const Checkout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = createSignal(false);

  const [searchParams] = useSearchParams();
  const { order_id, total_price } = searchParams;

  onMount(async () => {
    await loadMercadoPago();
    const mp = new window.MercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY);

    const cardForm = mp.cardForm({
      amount: String(total_price),
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: { id: "cardNumber", placeholder: "Card Number" },
        expirationDate: { id: "expirationDate", placeholder: "MM/YY" },
        securityCode: { id: "securityCode", placeholder: "Security Code" },
        cardholderName: { id: "cardholderName", placeholder: "Cardholder" },
        issuer: { id: "issuer", placeholder: "Issuer" },
        installments: { id: "installments", placeholder: "Installments" },
        identificationType: { id: "identificationType", placeholder: "ID Type" },
        identificationNumber: { id: "identificationNumber", placeholder: "ID Number" },
        cardholderEmail: { id: "cardholderEmail", placeholder: "Email" },
      },
      callbacks: {
        onFormMounted: (err: any) => {
          if (err) return console.warn("Form mounted error:", err);
          console.log("Form mounted successfully");
        },
        onSubmit: async (event: any) => {
          event.preventDefault();
          setIsLoading(true);

          const userId = await fetchUserId();

          const data = cardForm.getCardFormData();
          console.log("CardForm Data:", data);

          try {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Idempotency-Key": `payment${ order_id }`
              },
              body: JSON.stringify({
                token: data.token,
                issuer_id: data.issuerId,
                payment_method_id: data.paymentMethodId,
                transaction_amount: Number(data.amount),
                installments: Number(data.installments),
                description: `Payment for Order ${ order_id }`,
                payer: {
                  email: data.cardholderEmail,
                  identification: {
                    type: data.identificationType,
                    number: data.identificationNumber
                  }
                },
                order_id,
              })
            });

            if (!res.ok) {
              const err = await res.json();
              throw new Error(err.message);
            }

            setCartStore({
              id: crypto.randomUUID(),
              userId,
              items: [],
              totalPrice: 0,
              totalItems: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });

            const json = await res.json();
            navigate(`/invoice?payment_id=${json.id}&order_id=${order_id}`);
          } catch (err) {
            console.error("Checkout error:", err);
          } finally {
            () => setIsLoading(false);
          }
        },
        onFetching: (resource: any) => {
          console.log("Fetching:", resource);
        },
      }
    });
  });

  return (
    <section class="p-10 bg-green-600">
      <h1 class="text-center text-white font-bold">Checkout Form</h1>
      <form
        id="form-checkout"
        class="max-w-sm mx-auto flex flex-col my-4 px-10 gap-y-4"
      >
        <div id="cardNumber" class="h-10 p-2 rounded-md border-1 border-blue-300 bg-green-300"></div>
        <div class="flex gap-4">
          <div id="expirationDate" class="h-10 p-2 rounded-md border-1 border-blue-300 bg-green-300"></div>
          <div id="securityCode" class="h-10 p-2 rounded-md border-1 border-blue-300 bg-green-300"></div>
        </div>
        <input type="text" id="cardholderName" class="p-2 rounded-md border-1 border-blue-300 bg-green-300" placeholder="Cardholder name" />
        <select id="installments" class="p-2 rounded-md border-1 border-blue-300 bg-green-300"></select>
        <div class="flex justify-between gap-4">
          <select id="issuer" class="p-2 rounded-md border-1 border-blue-300 bg-green-300"></select>
          <select id="identificationType" class="p-2 rounded-md border-1 border-blue-300 bg-green-300"></select>
        </div>
        <input type="text" id="identificationNumber" placeholder="Document number" class="p-2 rounded-md border-1 border-blue-300 bg-green-300"/>
        <input type="email" id="cardholderEmail" placeholder="Email" class="p-2 rounded-md border-1 border-blue-300 bg-green-300" />
        
        <button
          type="submit"
          id="submit"
          class="p-2 rounded-xl bg-blue-600 hover:bg-blue-800 active:bg-blue-400 cursor-pointer"
          disabled={isLoading()}
        >
          {isLoading() ? "Processing..." : "Pay"}
        </button>
      </form>
    </section>
  );
};

export default Checkout;
