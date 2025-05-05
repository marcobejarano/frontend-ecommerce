import { Button } from "@/components/ui/button";
import { fetchInventoryByProductId } from "@/helpers/fetch-inventory-by-product-id";
import { fetchProducts } from "@/helpers/fetch-products";
import { InventoryForm, inventorySchema } from "@/lib/validation/inventorySchema";
import { createForm, reset, setValue, valiForm } from "@modular-forms/solid";
import { createResource, createSignal, Show } from "solid-js";

const Inventory = () => {
  const [products] = createResource(fetchProducts);
  const [selectedProduct, setSelectedProduct] = createSignal<any>(null);

  const [inventoryForm, { Form, Field }] = createForm<InventoryForm>({
    validate: valiForm(inventorySchema),
  });

  const handleProductChange = async (e: Event) => {
    const selectedId = (e.target as HTMLSelectElement).value;
    const prod = products()?.find((p: any) => p.id === selectedId);
    setSelectedProduct(prod);

    if (!prod) return;

    const inventory = await fetchInventoryByProductId(selectedId);

    if (inventory) {
      // Inventory exists: fill form with values from DB
      reset(inventoryForm, {
        initialValues: {
          productId: selectedId,
          quantity_available: inventory.quantity_available || 0,
          quantity_reserved: inventory.quantity_reserved || 0,
          restock_date: inventory.restock_date || "",
        },
      });
    } else {
      // Inventory not found: prepare empty form
      reset(inventoryForm, {
        initialValues: {
          productId: selectedId,
          quantity_available: 0,
          quantity_reserved: 0,
          restock_date: "",
        },
      });
    }
  }

  const handleSubmit = async (values: InventoryForm) => {
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      console.log("Values are:", values);

      reset(inventoryForm, {
        initialValues: {
          productId: "",
          quantity_available: 0,
          quantity_reserved: 0,
          restock_date: "",
        },
      });
    } catch (err) {
      console.error("Error during inventory creation:", err);
    }
  }

  return (
    <section class="p-10 space-y-4 text-center text-white bg-green-600">
      <h1 class="text-xl font-bold">Products Form</h1>
      <p>Manage your products here.</p>

      <Form
        onSubmit={ handleSubmit }
        class="max-w-sm space-y-4 mx-auto my-4 p-4 rounded-lg bg-zinc-600"
      >
        <Field name="productId" type="string">
          { (field, props) => (
            <div>
              <label for={ field.name }>Product: </label>
              <select
                { ...props }
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
                onChange={ handleProductChange }
                required
              >
                <option value="" class="bg-zinc-600">Select a product</option>
                <Show when={products()} keyed>
                  {(prods) =>
                    prods.map((prod: any) => (
                      <option value={prod.id} class="bg-zinc-600">{prod.name}</option>
                    ))
                  }
                </Show>
              </select>
              <Show when={field.error}>
                <div class="text-red-400">
                  { field.error }
                </div>
              </Show>
            </div>
          ) }
        </Field>

        <Field name="quantity_available" type="number">
          { (field, props) => (
            <div>
              <label for={ field.name }>Quantity Available: </label>
              <input
                { ...props }
                type="number"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
                value={field.value ?? ""}
                required
              />
              <Show when={field.error}>
                <div class="text-red-400">
                  { field.error }
                </div>
              </Show>
            </div>
          ) }
        </Field>

        <Field name="quantity_reserved" type="number">
          { (field, props) => (
            <div>
              <label for={ field.name }>Quantity Reserved: </label>
              <input
                { ...props }
                type="number"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
                value={field.value ?? ""}
                required
              />
              <Show when={field.error}>
                <div class="text-red-400">
                  { field.error }
                </div>
              </Show>
            </div>
          ) }
        </Field>

        <Field name="restock_date">
          { (field, props) => (
            <div>
              <label for={ field.name }>Restock Date: </label>
              <input
                { ...props }
                type="date"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
                value={field.value ?? ""}
                required
              />
              <Show when={field.error}>
                <div class="text-red-400">
                  { field.error }
                </div>
              </Show>
            </div>
          ) }
        </Field>

        <Button type="submit">
          Create/Update Inventory
        </Button>
      </Form>
    </section>
  );
};

export default Inventory;
