import { GoogleLogin, LoginForm } from "@/components";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <h3 className="sm:text-4xl text-3xl font-inter font-medium mb-3">
        Log in to Exclusive
      </h3>
      <p>Enter your details below</p>

      {/* Login form */}
      <LoginForm />

      {/* Google login */}
      <GoogleLogin text="Log In with Google " />

      <p className="mt-8 text-[#4D4D4D]">
        New to Exclusive?{" "}
        <Link href="/sign-up" className="font-medium underline ml-2">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
