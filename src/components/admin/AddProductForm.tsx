"use client";
import { adminAddProductFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof adminAddProductFormSchema>>({
    resolver: zodResolver(adminAddProductFormSchema),
  });

  const onSubmit = async (
    values: z.infer<typeof adminAddProductFormSchema>
  ) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Product Name */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("name")}
            placeholder="Product name"
            className="admin-input"
          />
          {errors.name && (
            <p className="admin-form-validation-error ">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Product Category */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("name")}
            placeholder="Product name"
            className="admin-input"
          />
          {errors.name && (
            <p className="admin-form-validation-error ">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <button
        disabled={isSubmitting}
        className="button-primary float-right block md:mb-6 py-3 px-6"
        type="submit"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
