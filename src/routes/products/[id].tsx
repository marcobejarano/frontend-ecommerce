import { Button } from "@/components/ui/button";
import { fetchProductById } from "@/helpers/fetch-product-by-id";
import { addToCart, removeFromCart } from "@/stores/cart-store";
import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product] = createResource(() => id, fetchProductById);
  
  const handleAddToCart = async () => {
    await addToCart(product());
  };

  const handleRemoveFromCart = async () => {
    await removeFromCart(product());
  };

  return (
    <section class="p-10 space-y-4 text-center bg-green-600">
      <Show when={ product() } fallback={ <p>Loading product...</p> }>
        <div>
          <h1>{ product().name }</h1>
          <p>Welcome to the { product().name } section!</p>
          <div class="flex flex-col justify-center items-center gap-4 sm:flex-row">
            <img
              src={ `/images/${ product().imageUrl }` }
              alt={ product().name }
              class="w-80 h-80 object-cover border-2 rounded-xl"
            />
            <div class="flex flex-col justify-center items-center gap-4">
              <Button onClick={ handleAddToCart }>Add to Cart</Button>
              <Button onClick={ handleRemoveFromCart }>Remove from Cart</Button>
              <p><strong>Description:</strong> { product().description }</p>
            </div>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default ProductDetail;
