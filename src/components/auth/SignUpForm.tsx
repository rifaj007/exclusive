"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { signUpWithCredentials } from "@/libs/actions/auth/signup-with-credentials";
import { signUpFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const SignUpForm = () => {
  /* state for showing and hiding the password */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  /* keep watching the password and confirm password for showing the show and hide the password */
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  /* handle submit */
  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...otherValues } = values;

      const res = await signUpWithCredentials({
        user: {
          ...otherValues,
          password: values.confirmPassword,
          address: "",
          emailVerified: false,
          role: "user",
          provider: "credentials",
        },
      });

      if (res.success) {
        toast.success(res.success, { duration: 10000 });
      }

      if (res.error) {
        toast.error(res.error, { duration: 10000 });
      }

      reset();
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred! Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 mb-4 flex flex-col gap-10"
    >
      {/* Name */}
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="auth-input"
        />
        {errors.name && (
          <p className="form-validation-error ">{errors.name.message}</p>
        )}
      </div>

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
      <button disabled={isSubmitting} type="submit" className="button-primary w-full">
        {isSubmitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
};

export default SignUpForm;
