import { ResetPasswordForm } from "@/components";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <>
      <h3 className="sm:text-4xl text-3xl font-inter font-medium mb-3">
        Reset your password
      </h3>
      <p>Enter your email below</p>

      {/* reset password form */}
      <ResetPasswordForm />

      <p className="mt-8 text-[#4D4D4D]">
        Back to login?{" "}
        <Link href="/log-in" className="font-medium underline ml-2">
          login
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordPage;
