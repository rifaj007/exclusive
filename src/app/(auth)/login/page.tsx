import { GoogleLogin } from "@/components";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <h3 className="text-4xl font-inter font-medium mb-3">
        Log in to Exclusive
      </h3>
      <p>Enter your details below</p>

      <form className="mt-12 mb-4">
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="auth-input mb-10"
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input mb-10"
        />
        <div>
        <button type="submit" className="button w-full">
          Log In
        </button>
        </div>
      </form>
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
