"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";

type Props = {
  existingImage?: string;
  onImageSelect: (files: File[]) => void;
};

const ProfileImageUploader = ({ existingImage, onImageSelect }: Props) => {
  const [preview, setPreview] = useState<string | null>(existingImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_MB = 4;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_SIZE_MB) {
        toast.error("Image must be less than 4MB");
        return;
      }

      setPreview(URL.createObjectURL(file));
      onImageSelect([file]);
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > MAX_SIZE_MB) {
      toast.error("Image must be less than 4MB");
      return;
    }
  
    setPreview(URL.createObjectURL(file));
    onImageSelect([file]);
  };
  

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-2 rounded-md text-center cursor-pointer transition",
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      onClick={handleClick}
    >
      <input {...getInputProps()} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {preview ? (
        <div className="flex justify-center">
          <Image
            src={preview}
            alt="Selected preview"
            width={150}
            height={150}
            className="object-cover rounded-md"
          />
        </div>
      ) : (
        <p className="text-gray-500">
          Drag & drop an image here, or{" "}
          <span className="text-secondary-3 underline">click to select</span>
        </p>
      )}
    </div>
  );
};

export default ProfileImageUploader;
