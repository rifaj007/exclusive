import { NewPasswordForm } from "@/components";
import Link from "next/link";

const NewPasswordPage = () => {
  return (
    <>
      {/* new password form */}
      <NewPasswordForm />

      <p className="mt-8 text-[#4D4D4D]">
        Back to login?{" "}
        <Link href="/log-in" className="font-medium underline ml-2">
          login
        </Link>
      </p>
    </>
  );
};

export default NewPasswordPage;
