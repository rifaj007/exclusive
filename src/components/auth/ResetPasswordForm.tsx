'use client'
import { resetPassword } from "@/libs/actions/auth/reset-password";
import { resetPasswordSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      const data = await resetPassword(values);

      if (data?.error) {
        toast.error(data.error);
      } else if (data?.success) {
        toast.success(data.success, {duration: 10000});
        reset();
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

      <button disabled={isSubmitting} type="submit" className="button px-8">
        {isSubmitting ? "Sending email..." : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
