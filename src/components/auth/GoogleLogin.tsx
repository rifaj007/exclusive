"use client";
import { GoogleIcon } from "@/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GoogleLogin = ({ text }: { text: string }) => {
  const [redirectUrl, setRedirectUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    const storedCallbackUrl = localStorage.getItem("callbackUrl");
    if (storedCallbackUrl) {
      setRedirectUrl(storedCallbackUrl);
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { redirect: false });

      toast.success("Logged in successfully!");
      router.push(redirectUrl);
      localStorage.removeItem("callbackUrl");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex-center gap-4 py-4 border-text-4 border rounded w-full"
    >
      <GoogleIcon /> {text}
    </button>
  );
};

export default GoogleLogin;
