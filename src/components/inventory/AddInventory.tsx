"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Dropdown from "@/components/ui/Dropdown";
import { useToast } from "@/context/ToastContext";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImageUploader";
interface FormData {
  category: string;
  price: string;
  description: string;
  discount: string;
  quantity: string;
  name: string;
}
const InventoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    category: "",
    price: "",
    discount: "",
    description: "",
    quantity: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleUpload = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.category) validationErrors.category = "Category is required";
    if (!formData.price) validationErrors.price = "Price is required";
    if (!formData.description)
      validationErrors.description = "Description is required";
    if (!formData.discount) validationErrors.discount = "Discount is required";
    if (!formData.quantity) validationErrors.quantity = "Quantity is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", { ...formData, images });
      showToast("success", "Item added successfully!");
      onClose();
    }
  };
  const [images, setImages] = useState<File[]>([]);

  if (!isOpen) return null;

  return (
    <div className="">
      <div className=" overflow-y-auto max-h-[80vh]">
        <Input
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <Dropdown
          title="Category"
          options={[
            {
              id: "1",
              name: "One",
            },
            {
              id: "2",
              name: "Two",
            },
          ]}
          value={formData.category}
          onChange={(name: string) =>
            setFormData({ ...formData, category: name })
          }
          error={errors.category}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          prepend="N"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          error={errors.price}
        />
        <Input
          label="Discount %"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
          error={errors.discount}
        />
        <Input
          label="Quantity"
          showIncrement
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          error={errors.quantity}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={errors.description}
        />
        <ImageUploader
          label="Product Images"
          maxImages={10}
          maxFileSizeMB={10}
          required
          onImagesChange={(uploadedImages) => {
            setImages(uploadedImages);
          }}
        />
      </div>
      <button
        className="w-full bg-green-500 text-white py-2 mt-4 rounded"
        onClick={handleUpload}
      >
        Upload to Inventory
      </button>
    </div>
  );
};

export default InventoryModal;
