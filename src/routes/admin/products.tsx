import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createForm, valiForm } from "@modular-forms/solid"
import { createResource, createSignal, Show } from "solid-js";
import { CheckCircle } from "lucide-solid";
import { ProductForm, productSchema } from "@/lib/validation/productSchema";
import { fetchCategories } from "@/helpers/fetch-categories";

const Products = () => {
  const [successNotification, setSuccessNotification] = createSignal<string | null>(null);
  const [categories] = createResource(fetchCategories);

  const [, { Form, Field }] = createForm<ProductForm>({
    validate: valiForm(productSchema),
  });

  const handleSubmit = async (values: ProductForm) => {
    try {
      const res = await fetch("/api/products", {
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
      setSuccessNotification("Product successfully created!");

      setTimeout(() => {
        setSuccessNotification(null);
      }, 3000);
    } catch (err) {
      console.error("Error during product creation:", err);
    }
  };

  return (
    <section class="p-10 space-y-4 text-center text-white bg-green-600">
      <h1 class="text-xl font-bold">Products Form</h1>
      <p>Manage your products here.</p>

      <Show when={ successNotification() }>
        <Alert class="max-w-sm mx-auto my-4 text-white bg-green-900">
          <CheckCircle class="w-5 h-5" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{ successNotification() }</AlertDescription>
        </Alert>
      </Show>

      <Form
        onSubmit={ handleSubmit }
        class="max-w-sm space-y-4 mx-auto my-4 p-4 rounded-lg bg-zinc-600"
      >
        <Field name="name">
          { (field, props) => (
            <div>
              <label for={ field.name }>Name: </label>
              <input
                { ...props }
                type="text"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
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

        <Field name="categoryId">
          { (field, props) => (
            <div>
              <label for={ field.name }>Category: </label>
              <select
                { ...props }
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
                required
              >
                <option value="" class="bg-zinc-600">Select a category</option>
                <Show when={categories()} keyed>
                  {(cats: { id: string; name: string }[]) =>
                    cats.map((cat) => (
                      <option value={cat.id} class="bg-zinc-600">{cat.name}</option>
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

        <Field name="price" type="number">
          { (field, props) => (
            <div>
              <label for={ field.name }>Price: </label>
              <input
                { ...props }
                type="number"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
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

        <Field name="imageUrl">
          { (field, props) => (
            <div>
              <label for={ field.name }>Image URL: </label>
              <input
                { ...props }
                type="text"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
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

        <Field name="description">
          { (field, props) => (
            <div>
              <label for={ field.name }>Description: </label>
              <input
                { ...props }
                type="text"
                class="m-2 p-2 border-2 border-gray-300 rounded-md"
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
          Create Product
        </Button>
      </Form>
    </section>
  );
};

export default Products;
