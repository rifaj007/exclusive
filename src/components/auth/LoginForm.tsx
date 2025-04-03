"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { logInWithCredentials } from "@/libs/actions/auth/login-with-credentials";
import { loginFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

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
      const data = await logInWithCredentials(values, callbackUrl);

      if (data?.error) {
        toast.error(data.error);
      } else if (data?.success) {
        toast.success(data.success);
        reset();
      } else if (data?.url) {
        window.location.assign(data?.url);
      }
    } catch {
      toast.error("Something went wrong!. Please try again.");
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

        <Link className="text-secondary-3" href="/reset-password">
          Forget Password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
