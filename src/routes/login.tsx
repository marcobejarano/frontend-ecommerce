import AuthForm from "@/components/shared/AuthForm";

const Login = () => {
  return (
    <AuthForm
      title="Log In"
      description="Fill in the form below to log in."
      endpoint="/api/login"
      redirectLink="/"
      buttonLabel="Log In"
      question="Don't have an account yet?"
      answer="If not, sign up by clicking"
      redirectionLink="/signup"
    />
  );
};

export default Login;
