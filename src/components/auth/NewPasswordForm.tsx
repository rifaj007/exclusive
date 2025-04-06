"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { newPassword } from "@/libs/actions/auth/new-password";
import { newPasswordSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const NewPasswordForm = () => {
  /* state for showing and hiding the password */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
  });

  /* keep watching the password and confirm password for showing the show and hide the password */
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    try {
      const data = await newPassword(values, token);

      if (data?.error) {
        toast.error(data.error);
      } else if (data?.success) {
        toast.success(data.success, { duration: 10000 });
        window.location.assign("/log-in");
        reset();
      }
    } catch {
      toast.error("Something went wrong!. Please try again.");
    }
  }

  if (!token) return <p className="text-red-700 py-4 font-semibold">Token is missing</p>;

  return (
    <>
      <h3 className="sm:text-3xl text-2xl font-inter font-medium mb-3">
        Enter a new password
      </h3>
      <p>Enter your details below</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 mb-7 flex flex-col gap-10"
      >
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

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="auth-input"
            />
            {confirmPasswordValue && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-0 bottom-0"
              >
                {showConfirmPassword ? (
                  <EyeCloseIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            )}
          </div>

          {errors.confirmPassword && (
            <p className="form-validation-error ">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Signup button */}
        <button disabled={isSubmitting} type="submit" className="button w-full">
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
};

export default NewPasswordForm;
