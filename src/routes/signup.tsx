import AuthForm from "@/components/shared/AuthForm";

const Signup = () => {
  return (
    <AuthForm
      title="Sign Up"
      description="Fill in the form below to create an account."
      endpoint="/api/signup"
      redirectLink="/login"
      buttonLabel="Sign Up"
      question="Are you already registered?"
      answer="If so, log in by clicking"
      redirectionLink="/login"
    />
  );
};

export default Signup;
