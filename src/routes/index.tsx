import { Title } from "@solidjs/meta";
import FeaturedGuineaPigs from "@/components/customer/home/FeaturedGuineaPigs";
import { onMount } from "solid-js";
import { fetchUserId } from "@/helpers/fetch-user-id";
import { setCartStore } from "@/stores/cart-store";

const Index = () => {
  onMount(async () => {
    const userId = await fetchUserId();

    if (userId) {
      setCartStore("userId", userId);
    }
  });

  return (
    <main>
      <Title>Guinea Galaxy - Adorable Guinea Pigs for Sale</Title>
      <section class="py-10 space-y-4 text-center text-white bg-green-600">
        <h1>Welcome to Guinea Galaxy</h1>
        <p>Your one-stop shop for the cutest guinea pigs on Lima.</p>
      </section>

      <section>
        <div>
          <img
            src="/images/guinea_pigs_top_banner.png"
            alt="Guinea Pigs Top Banner"
          />
        </div>
      </section>

      <section class="py-10 space-y-4 text-center text-white bg-green-600">
        <FeaturedGuineaPigs />
      </section>
    </main>
  );
};

export default Index;
