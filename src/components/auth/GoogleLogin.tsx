"use client";
import { GoogleIcon } from "@/icons";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const GoogleLogin = ({ text }: { text: string }) => {
  const [redirectUrl, setRedirectUrl] = useState("/");

  // Load stored callback URL from localStorage
  useEffect(() => {
    const storedCallbackUrl = localStorage.getItem("callbackUrl");
    if (storedCallbackUrl) {
      setRedirectUrl(storedCallbackUrl);
    }
  }, []);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: redirectUrl });

    localStorage.removeItem("callbackUrl");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-4 py-4 border border-border-1 rounded w-full"
    >
      <GoogleIcon /> {text}
    </button>
  );
};

export default GoogleLogin;
