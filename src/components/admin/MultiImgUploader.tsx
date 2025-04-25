import { useRef, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";
import { PlusIcon } from "@/icons";
import toast from "react-hot-toast";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
};

const MAX_FILE_SIZE_MB = 4;

const MultiImgUploader = ({ files, onChange }: Props) => {
  const { routeConfig } = useUploadThing("productImageUploader");
  const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const handleReplaceClick = (index: number) => {
    setReplaceIndex(index);
    fileInputRef.current?.click();
  };

  const handleReplaceFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("File size exceeds 4MB");
      return;
    }

    const newFiles = [...files];
    if (replaceIndex !== null) {
      newFiles[replaceIndex] = file;
      onChange(newFiles);
      setReplaceIndex(null);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const filtered = acceptedFiles.filter(
      (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );
    if (filtered.length < acceptedFiles.length) {
      toast.error("File size exceeds 4MB");
    }

    if (filtered.length > 0) {
      onChange([...files, ...filtered]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(fileTypes),
    multiple: true,
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 rounded p-2 bg-secondary-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative w-full aspect-square border rounded overflow-hidden cursor-pointer"
            onClick={() => handleReplaceClick(index)}
          >
            <Image
              key={`${file.name}-${file.lastModified}`}
              src={URL.createObjectURL(file)}
              alt={`upload-${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Dropzone box */}
        <div
          {...getRootProps()}
          className={`relative w-full aspect-square border-2 border-dashed rounded-md cursor-pointer overflow-hidden flex items-center justify-center transition
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-400 bg-gray-50"
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <PlusIcon />
            <span className="text-sm">Add image</span>
          </div>
        </div>
      </div>

      {/* Hidden file input for replacing an image */}
      <input
        ref={fileInputRef}
        type="file"
        accept={fileTypes.map((type) => `${type}/*`).join(",")}
        className="hidden"
        onChange={handleReplaceFile}
      />
    </div>
  );
};

export default MultiImgUploader;
