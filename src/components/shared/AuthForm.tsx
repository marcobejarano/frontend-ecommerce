import { createForm, valiForm } from "@modular-forms/solid"
import { A, useNavigate } from "@solidjs/router";
import { signupLoginSchema } from "@/lib/validation/signupLoginSchema";
import { AuthFormProps } from "@/types/auth-form-props";
import { SignupLoginForm } from "@/types/signup-login-form"
import { Button } from "../ui/button";

const AuthForm = (
  { title, description, endpoint, redirectLink, buttonLabel, question, answer, redirectionLink }: AuthFormProps
) => {
  const [, { Form, Field }] = createForm<SignupLoginForm>({
    validate: valiForm(signupLoginSchema),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: SignupLoginForm) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      
      const data = await response.json();
      console.log(`${ title } successful`, data);
      navigate(redirectLink);
    } catch (err) {
      console.error(`Error during ${ title }`, err);
    }
  }

  return (
    <section class="p-10 text-center text-white bg-green-600">
      <h1 class="text-lg font-bold">{ title }</h1>
      <p>{ description }</p>
      <Form
        onSubmit={ handleSubmit }
        class="max-w-sm space-y-4 mx-auto my-4 p-4 rounded-lg bg-zinc-600"
      >
        <Field name="email">
          { (field, props) => (
            <div>
              <label for={ field.name }>Email: </label>
              <input
                { ...props }
                type="email"
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

        <Field name="password">
          { (field, props) => (
            <div>
              <label for={ field.name }>Password: </label>
              <input
                { ...props }
                type="password"
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
          { buttonLabel }
        </Button>
      </Form>
      <p>{ question }</p>
      <p>{ answer } <A href={ `${ redirectionLink }` } class="text-blue-800 hover:text-blue-600 active:text-blue-800">
          here
        </A>
      </p>
    </section>
  );
};

export default AuthForm;
