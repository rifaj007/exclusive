"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { login } from "@/libs/actions/user.action";
import { loginFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
      await login({
        email: values.email,
        password: values.password,
      })

      reset();
      toast.success("Logged in successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Error while logging in!");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 mb-4 flex flex-col gap-10">
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
