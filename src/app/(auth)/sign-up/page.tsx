import { GoogleLogin } from "@/components";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <h3 className="text-4xl font-inter font-medium mb-3">
        Create an account
      </h3>
      <p>Enter your details below</p>

      <form className="mt-12 mb-4">
        <input type="text" placeholder="Name" className="auth-input mb-10" />
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
        <button type="submit" className="button w-full">
          Create Account
        </button>
      </form>

      <GoogleLogin text="Sign up with Google" />

      <p className="mt-8 text-[#4D4D4D]">Already have account? <Link href="/login" className="font-medium underline ml-2">Log in</Link></p>
    </>
  );
};

export default SignUp;
