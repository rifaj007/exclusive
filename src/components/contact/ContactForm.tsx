"use client";
import { contactFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-10 pb-20 md:pb-0 px-8 shadow-custom rounded h-full"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Name */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("name")}
            placeholder="Your Name"
            className="input"
          />
          {errors.name && (
            <p className="form-validation-error ">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("email")}
            placeholder="Your Email"
            className="input"
          />
          {errors.email && (
            <p className="form-validation-error ">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("phone")}
            placeholder="Your Phone"
            className="input"
          />
          {errors.phone && (
            <p className="form-validation-error ">{errors.phone.message}</p>
          )}
        </div>

        <div className=" xl:col-span-3">
          <textarea
            {...register("message")}
            className="input resize-none w-full h-[205px]"
            placeholder="Your message"
          />
          {errors.message && (
            <p className="form-validation-error ">{errors.message.message}</p>
          )}
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className="button-primary float-right block md:mb-6 "
        type="submit"
      >
        {isSubmitting ? "Sending message" : "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
