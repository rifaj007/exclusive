"use client";

import { adminAddProductFormSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultiImgUploader from "./MultiImgUploader";
import { useEffect, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import SizeDropdown from "./SizeDropdown";
import ColorPicker from "./ColorPicker";
import { createNewProduct, updateProduct } from "@/libs/actions/product";
import { IProduct } from "@/libs/database/models/product.model";
import { useRouter } from "next/navigation";

interface IProps {
  product?: IProduct;
}

const AddProductForm = ({ product }: IProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]); // for image upload
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // for size dropdown
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // for color picker
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof adminAddProductFormSchema>>({
    resolver: zodResolver(adminAddProductFormSchema),
    defaultValues: product
      ? {
          ...product,
          image: product.image || [],
          size: product.size || [],
          colors: product.colors || [],
        }
      : {},
  });

  // Registering fields for react-hook-form that are not directly in the form
  useEffect(() => {
    register("image");
    register("size");
    register("colors");

    if (product) {
      reset({
        ...product,
        image: product.image || [],
        size: product.size || [],
        colors: product.colors || [],
      });

      setSelectedOptions(product.size || []);
      setSelectedColors(product.colors || []);
    }
  }, [register, product, reset]);

  const { startUpload } = useUploadThing("productImageUploader");

  const handleImageChange = (files: File[]) => {
    setImageFiles(files);

    if (files.length > 0) {
      const dummyUrls = files.map((file) => URL.createObjectURL(file));
      setValue("image", dummyUrls);
      trigger("image");
    } else {
      setValue("image", []);
      trigger("image");
    }
  };

  const onSubmit = async (
    values: z.infer<typeof adminAddProductFormSchema>
  ) => {
    try {
      if (imageFiles.length > 0) {
        const uploadedImages = await startUpload(imageFiles);
        if (!uploadedImages) {
          toast.error("Image upload failed");
          return;
        }
        values.image = uploadedImages.map((img) => img.url);
      } else if (product) {
        values.image = product.image;
      }

      const payload = {
        ...values,
        flashSale: product?.flashSale ?? false,
        bestSelling: product?.bestSelling ?? false,
        isNew: product?.isNew ?? false,
      };

      if (product) {
        await updateProduct({ product: { ...payload, _id: product._id } });
        toast.success("Product updated successfully");
      } else {
        await createNewProduct({ product: payload });
        toast.success("Product added successfully");
      }

      router.push("/admin/all-product");
      reset();
      setSelectedColors([]);
      setSelectedOptions([]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8 ">
        {/* Product Name */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("name")}
            placeholder="Product name"
            className="admin-input"
          />
          {errors.name && (
            <p className="admin-form-validation-error">{errors.name.message}</p>
          )}
        </div>

        {/* Offer price */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("offerPrice", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Offer price"
            className="admin-input"
            type="number"
          />
          {errors.offerPrice && (
            <p className="admin-form-validation-error">
              {errors.offerPrice.message}
            </p>
          )}
        </div>

        {/* Original price */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("originalPrice", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Original price"
            className="admin-input"
            type="number"
          />
          {errors.originalPrice && (
            <p className="admin-form-validation-error">
              {errors.originalPrice.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label className="text-xs mb-1 inline-block text-border-1">
            (optional)
          </label>
          <input
            {...register("discount", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Discount percentage"
            className="admin-input"
            type="number"
          />
          {errors.discount && (
            <p className="admin-form-validation-error">
              {errors.discount.message}
            </p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("rating", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Rating"
            className="admin-input"
            type="number"
            step="0.1"
          />
          {errors.rating && (
            <p className="admin-form-validation-error">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Reviews */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("reviews", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Reviews"
            className="admin-input"
            type="number"
          />
          {errors.reviews && (
            <p className="admin-form-validation-error">
              {errors.reviews.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-red-500 block">*</label>
          <input
            {...register("category")}
            placeholder="Category name"
            className="admin-input"
          />
          {errors.category && (
            <p className="admin-form-validation-error">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="text-xs mb-1 inline-block text-border-1">
            (optional)
          </label>
          <input
            {...register("type")}
            placeholder="Type"
            className="admin-input"
          />
          {errors.type && (
            <p className="admin-form-validation-error">{errors.type.message}</p>
          )}
        </div>

        {/* Size */}
        <div>
          <label className="text-xs mb-1 inline-block text-border-1">
            (optional)
          </label>
          <SizeDropdown
            setValue={setValue}
            setSelectedOptions={setSelectedOptions}
            selectedOptions={selectedOptions}
            options={["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"]}
          />
          {errors.size && (
            <p className="admin-form-validation-error">{errors.size.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-red-500 block">*</label>
          <textarea
            {...register("description")}
            placeholder="Product description"
            className="admin-input"
            rows={8}
          />
          {errors.description && (
            <p className="admin-form-validation-error">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Uploader */}
        <div className="lg:col-span-2">
          <label className="text-red-500 block">*</label>
          <MultiImgUploader files={imageFiles} onChange={handleImageChange} />
          {errors.image && (
            <p className="admin-form-validation-error">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Colors */}
        <div>
          <label className="text-xs mb-1 inline-block text-border-1">
            Colors: (optional)
          </label>
          <ColorPicker
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            setValue={setValue}
            trigger={trigger}
          />
          {errors.colors && (
            <p className="admin-form-validation-error">
              {errors.colors.message}
            </p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label className="block mb-2 text-sm text-text-2">
            <span className="text-red-500 mr-3 text-base">*</span>Availability
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="In Stock"
                {...register("availability")}
                className="accent-green-500"
              />
              In Stock
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Out of Stock"
                {...register("availability")}
                className="accent-red-500"
              />
              Out of Stock
            </label>
          </div>
          {errors.availability && (
            <p className="admin-form-validation-error">
              {errors.availability.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        className="button-primary float-right block md:mb-6 py-3 px-6"
        type="submit"
      >
        {isSubmitting
          ? "Submitting..."
          : product
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
