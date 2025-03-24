"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { loginFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
        // Check specific error messages from NextAuth
        if (res.error.includes("No user found")) {
          toast.error("No account found with this email. Please sign up.");
        } else if (res.error.includes("Wrong password")) {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Authentication failed. Please check your credentials.");
        }
        return;
      } else {
        reset();
        router.push(callbackUrl);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 mb-4 flex flex-col gap-10"
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
      <button disabled={isSubmitting} type="submit" className="button w-full">
        {isSubmitting ? "Logging in" : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
