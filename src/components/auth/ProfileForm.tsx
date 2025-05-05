"use client";

import { UserParams } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { userUpdateProfileFormSchema } from "@/libs/validator";
import { useState } from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { updateUserByEmail } from "@/libs/actions/auth/get-update-user";
import { EyeCloseIcon, EyeIcon } from "@/icons";

const ProfileForm = ({ user }: UserParams) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(user);

  const {
    register,
    handleSubmit,
    /* setValue,
    trigger,
    */
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<z.infer<typeof userUpdateProfileFormSchema>>({
    resolver: zodResolver(userUpdateProfileFormSchema),
    defaultValues: user,
  });

  const { startUpload } = useUploadThing("imageUploader");

  /* keep watching the password and confirm password for showing the show and hide the password */
  const currentPasswordValue = watch("currentPassword");
  const newPasswordValue = watch("newPassword");
  const confirmPasswordValue = watch("confirmPassword");

  /* handle submit */
  const onSubmit = async (
    values: z.infer<typeof userUpdateProfileFormSchema>
  ) => {
    try {
      console.log(values);

      if (imageFiles.length > 0) {
        const uploaded = await startUpload(imageFiles);
        if (!uploaded) {
          toast.error("Image upload failed");
          return;
        }
        values.image = uploaded[0].url;
      } else {
        values.image = user.image;
      }

      // call your updateUserByEmail API here
      await updateUserByEmail(values);
      toast.success("Profile updated successfully");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Name Input */}
          <div>
            <label className="block mb-2">Name</label>
            <input
              {...register("name")}
              placeholder="Your name"
              className="admin-input"
            />
            {errors.name && (
              <p className="admin-form-validation-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-2">
              Email <span className="text-green-500 text-xs">(Verified)</span>
            </label>
            <input
              {...register("email")}
              placeholder="Your email"
              className="admin-input opacity-75"
              readOnly
            />
            {errors.name && (
              <p className="admin-form-validation-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block mb-2">Profile Image</label>
            <ProfileImageUploader
              existingImage={user.image || ""}
              onImageSelect={(files) => setImageFiles(files)}
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block mb-2">Address</label>
            <input
              {...register("address")}
              placeholder="Your address"
              className="admin-input"
            />
            {errors.name && (
              <p className="admin-form-validation-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* password */}
          {user.provider === "credentials" && (
            <>
              {/* current password */}
              <div className="lg:col-span-2">
                <label className="block mb-2">Password Changes</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    {...register("currentPassword")}
                    className="admin-input placeholder:"
                    placeholder="Current Password"
                  />
                  {currentPasswordValue && (
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-2 top-0 bottom-0"
                    >
                      {showCurrentPassword ? (
                        <EyeCloseIcon className="w-6 h-6" />
                      ) : (
                        <EyeIcon className="w-6 h-6" />
                      )}
                    </button>
                  )}
                </div>

                {errors.currentPassword && (
                  <p className="admin-form-validation-error">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* new password */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword")}
                    className="admin-input"
                    placeholder="New Password"
                  />
                  {newPasswordValue && (
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-2 top-0 bottom-0"
                    >
                      {showNewPassword ? (
                        <EyeCloseIcon className="w-6 h-6" />
                      ) : (
                        <EyeIcon className="w-6 h-6" />
                      )}
                    </button>
                  )}
                </div>

                {errors.newPassword && (
                  <p className="admin-form-validation-error">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* confirm password */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="admin-input"
                    placeholder="Confirm Password"
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
                  <p className="admin-form-validation-error">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting || (!isDirty && imageFiles.length === 0)}
          className="button-primary float-right block md:mb-6 py-3 px-6"
          type="submit"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
