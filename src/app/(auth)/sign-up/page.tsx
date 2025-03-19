import { GoogleLogin, SignUpForm } from "@/components";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <h3 className="text-4xl font-inter font-medium mb-3">
        Create an account
      </h3>
      <p>Enter your details below</p>

      {/* Signup form */}
      <SignUpForm />

      {/* Google Login */}
      <GoogleLogin text="Sign up with Google" />

      <p className="mt-8 text-[#4D4D4D]">
        Already have account?{" "}
        <Link href="/log-in" className="font-medium underline ml-2">
          Log in
        </Link>
      </p>
    </>
  );
};

export default SignUp;
