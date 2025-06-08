"use client";
import React, { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { useToast } from "@/context/ToastContext";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImageUploader";
import { useGetProductCategoriesQuery } from "@/store/api/queries"; // Import the query
import { useCreateProductMutation } from "@/store/api/mutations"; // Import mutation
import Button from "@/components/ui/Button"; // Import Button component

interface FormData {
  category: string;
  price: string;
  description: string;
  discount: string;
  quantity: string;
  name: string;
  terms_and_conditions: string; // Removed barcode
}

const InventoryModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showToast } = useToast();
  const [createProduct, { isLoading: isSubmitting }] = useCreateProductMutation(); // Use mutation
  const [formData, setFormData] = useState<FormData>({
    category: "",
    price: "",
    discount: "",
    description: "",
    quantity: "",
    name: "",
    terms_and_conditions: "", // Removed barcode
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [images, setImages] = useState<File[]>([]);

  // Fetch product categories
  const {
    data: categoriesData,
    isLoading,
  } = useGetProductCategoriesQuery(
    {
      limit: 20,
      page: 1,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Transform categories into dropdown options, filtering by active
  const categoryOptions =
    categoriesData?.data
      ?.filter((category: any) => category.active) // Include only active categories
      .map((category: any) => ({
        id: category._id,
        name: category.title,
      })) || [];

  const handleUpload = async () => {
    console.log('sdf')
    const validationErrors: Partial<FormData> = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.category) validationErrors.category = "Category is required";
    if (!formData.price) validationErrors.price = "Price is required";
    if (!formData.description)
      validationErrors.description = "Description is required";
    if (!formData.discount) validationErrors.discount = "Discount is required";
    if (!formData.quantity) validationErrors.quantity = "Quantity is required";
    if (!formData.terms_and_conditions)
      validationErrors.terms_and_conditions = "Terms and conditions are required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formPayload = new FormData();
      formPayload.append("product_name", formData.name);
      formPayload.append("description", formData.description);
      formPayload.append("stock_quantity", formData.quantity);
      formPayload.append("price", formData.price);
      formPayload.append("category_id", formData.category);
      formPayload.append("terms_and_conditions", formData.terms_and_conditions);
      formPayload.append("discount", formData.discount);

      images.forEach((image) => {
        formPayload.append("images", image); // Append images
      });

      try {
        await createProduct(formPayload).unwrap(); // Call mutation
        showToast("success", "Item added successfully!");
        onClose();
      } catch (error) {
        console.error("Failed to upload product:", error);
        showToast("error", "Failed to add item. Please try again.");
      }
    }
  };

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
          options={categoryOptions} // Bind filtered categories to dropdown
          value={formData.category}
          onChange={(name: string) =>
            setFormData({ ...formData, category: name })
          }
          error={errors.category}
          loading={isLoading} // Show loading state if categories are being fetched
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
          label="Terms and Conditions"
          name="terms_and_conditions"
          type="text"
          value={formData.terms_and_conditions}
          onChange={(e) =>
            setFormData({
              ...formData,
              terms_and_conditions: e.target.value,
            })
          }
          error={errors.terms_and_conditions}
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
      <Button
        block
        loading={isSubmitting} // Show loading state
        onClick={handleUpload} // Attach handleUpload function
      >
        Upload to Inventory
      </Button>
    </div>
  );
};

export default InventoryModal;
