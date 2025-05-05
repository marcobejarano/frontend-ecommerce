import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CategoryForm, categorySchema } from "@/lib/validation/categorySchema"
import { createForm, valiForm } from "@modular-forms/solid"
import { createSignal } from "solid-js";
import { CheckCircle } from "lucide-solid";

const Categories = () => {
  const [, { Form, Field }] = createForm<CategoryForm>({
    validate: valiForm(categorySchema),
  });

  const [successNotification, setSuccessNotification] = createSignal<string | null>(null);

  const handleSubmit = async (values: CategoryForm) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log("Category created successfully:", data);
      setSuccessNotification("Category successfully created!");
      setTimeout(() => {
        setSuccessNotification(null);
      }, 3000);
    } catch (err) {
      console.error("Error during category creation:", err);
    }
  };

  return (
    <section class="p-10 text-center text-white bg-green-600">
      <h1>Categories Form</h1>
      <p>Manage your categories here.</p>

      { successNotification() && (
        <Alert class="max-w-sm mx-auto my-4 bg-green-900">
          <CheckCircle class="w-5 h-5" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            { successNotification() }
          </AlertDescription>
        </Alert>
      ) }

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
              { field.error && (
                <div class="text-red-400">
                  { field.error }
                </div>
              ) }
            </div>
          ) }
        </Field>

        <Button type="submit">
          Create Category
        </Button>
      </Form>
    </section>
  );
};

export default Categories;
