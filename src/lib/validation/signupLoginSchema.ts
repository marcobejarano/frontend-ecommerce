import { email, minLength, nonEmpty, object, pipe, string } from "valibot";

export const signupLoginSchema = object({
  email: pipe(
    string("Your email must be a string"),
    nonEmpty("Please enter your email"),
    email("Please enter a valid email"),
  ),
  password: pipe(
    string("Your password must be a string"),
    nonEmpty("Please enter your password"),
    minLength(5, "Password must be at least 5 characters long"),
  ),
});
