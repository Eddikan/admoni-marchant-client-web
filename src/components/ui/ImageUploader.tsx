/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import Image from "next/image";
interface ImageUploaderProps {
  label: string;
  maxImages: number;
  maxFileSizeMB: number;
  required?: boolean;
  onImagesChange: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  maxImages,
  maxFileSizeMB, // removed unused 'required' prop
  onImagesChange,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files);
    const totalImages = images.length + newImages.length;

    if (totalImages > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    for (const image of newImages) {
      if (image.size > maxFileSizeMB * 1024 * 1024) {
        setError(`Each file must be smaller than ${maxFileSizeMB} MB.`);
        return;
      }
      if (!image.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }
    }

    setError("");
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-4  text-sm">
      <label className="block mb-2 font-medium">{label}</label>
      <div
        className="border-dashed py-6 border-2 border-green-500 rounded-lg p-4 cursor-pointer"
        onClick={openFileDialog}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="text-center flex flex-col items-center">
          <Image
            src="/icons/upload.svg"
            alt="Logo"
            width={36}
            height={24}
            priority
          />
          <p className="font-normal">
            Drag your file(s) or click to
            <span className="text-adGreen-200 font-semibold ml-1">browse</span>
          </p>
          <p className="text-sm text-gray-500">
            Max {maxImages} images, each up to {maxFileSizeMB} MB.
          </p>
        </div>
        <input
          type="file"
          ref={inputRef}
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className="flex gap-4 mt-4 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-[214px] h-[155px] flex-shrink-0"
          >
            {
              // eslint-disable-next-line @next/next/no-img-element
            }
            <img
              src={URL.createObjectURL(image)}
              alt={`product-${index}`}
              className="w-full h-full object-cover rounded"
            />

            <button
              type="button"
              onClick={() => handleImageRemove(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-0.5"
            >
              <Image
                alt="delete"
                src="/icons/delete.svg"
                width={24}
                height={24}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
