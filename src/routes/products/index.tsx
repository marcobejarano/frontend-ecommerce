import { Product } from "@/db/schema";
import { fetchProducts } from "@/helpers/fetch-products";
import { A } from "@solidjs/router";
import { createResource, For, Show } from "solid-js";

const ProductsPage = () => {
  const [products] = createResource<Product[]>(fetchProducts);

  return (
    <section class="p-10 space-y-4 text-center text-white bg-green-600">
      <h1>Our Guinea Pigs!</h1>
      <p>There are two main products of guinea pigs: babies and adults.</p>
      <div class="flex flex-col gap-8 justify-center items-center sm:flex-row">
        <Show when={ products() } fallback={ <p>Loading products...</p> }>
          <For each={ products() }>
            { (product) => (
              <A href={ `/products/${ product.id }` }>
                <h2>{ product.name }</h2>
                <img
                  src={ `/images/${ product.imageUrl }`}
                  alt={ product.name }
                  class="w-80 h-80 object-cover mt-2 border-2 rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </A>
            ) }
          </For>
        </Show>
      </div>
    </section>
  );
};

export default ProductsPage;
