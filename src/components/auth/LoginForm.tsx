"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { loginFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // set callback url in local storage
  useEffect(() => {
    if (callbackUrl) {
      localStorage.setItem("callbackUrl", callbackUrl);
    }
  }, [callbackUrl]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  /* keep watching the password for showing the show and hide the password */
  const passwordValue = watch("password");

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password!");
        return;
      }

      reset();
      const redirectUrl = localStorage.getItem("callbackUrl") || "/";
      router.push(decodeURIComponent(redirectUrl));
      toast.success("Logged in successfully!");
      localStorage.removeItem("callbackUrl");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 mb-7 flex flex-col gap-10"
    >
      {/* Email */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="auth-input"
        />
        {errors.email && (
          <p className="form-validation-error ">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="auth-input"
          />
          {passwordValue && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-0 bottom-0"
            >
              {showPassword ? (
                <EyeCloseIcon className="w-6 h-6" />
              ) : (
                <EyeIcon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {errors.password && (
          <p className="form-validation-error ">{errors.password.message}</p>
        )}
      </div>

      {/* Signin button */}
      <div className="flex-between">
        <button disabled={isSubmitting} type="submit" className="button px-8">
          {isSubmitting ? "Logging in" : "Log In"}
        </button>

        <Link className="text-secondary-3" href="/forget-password">Forget Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
