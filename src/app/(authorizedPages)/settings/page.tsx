/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {  useState } from "react";
import TabSwitcher from "@/components/ui/TabSwitcher";
import LinkedAccounts from "@/components/settings/LinkedAccounts";
import { useToast } from "@/context/ToastContext";
import ImageUploader from "@/components/ui/ImageUploader";
import ChangePassword from "@/components/settings/ChangePassword";
import ChangePin from "@/components/settings/ChangePin";
import Input from "@/components/ui/Input";
// Mock Data

interface FormData {
  storeName: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const { showToast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    storeName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleWithdrawNew = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.storeName)
      validationErrors.storeName = "Store Name is required";
    if (!formData.description)
      validationErrors.description = "Account name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone)
      validationErrors.description = "Description is required";
    if (!formData.location) validationErrors.location = "Location is required";
    if (!formData.phone)
      validationErrors.phone = "Phone number name is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      showToast("success", "Withdrawal successful!");
    }
  };
  return (
    <div className=" sm:px-6">
      {/* Top Cards */}
      <div className="flex justify-between">
        <p className=" text-3xl font-medium mb-11">Settings</p>
      </div>

      <div className="border rounded-lg">
        <div className="max-w-[700px] mt-8">
          <TabSwitcher
            tabs={[
              { id: "general", label: "General Settings" },
              { id: "linked", label: "Linked Account" },
              { id: "changePassword", label: "Change Password" },
              { id: "changePin", label: "Change Pin" },
            ]}
            activeTab={activeTab}
            onTabChange={(tab: string) => setActiveTab(tab)}
          />
        </div>
        <hr className="mt-4" />
        {activeTab === "general" ? (
          <div className="m-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div>
                <Input
                  label="Store Name"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={(e) =>
                    setFormData({ ...formData, storeName: e.target.value })
                  }
                  error={errors.storeName}
                />
                <Input
                  label="Email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                />
                <Input
                  label="Phone number"
                  name="phone"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  error={errors.phone}
                />
                <Input
                  label="Location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  error={errors.location}
                />

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                    className="w-full border rounded bg-transparent p-2"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="shadow-lg bg-white p-6 rounded-xl">
                <ImageUploader
                  label="Store Logo"
                  maxImages={10}
                  maxFileSizeMB={10}
                  required
                  onImagesChange={(uploadedImages) => {
                    setImages(uploadedImages);
                  }}
                />
                <p className="text-grey-450">Supports JPG, PNG</p>
              </div>
              <div className="mt-11 flex justify-end">
                <button
                  className="w-1/2 ml-auto bg-green-500 text-white py-2 rounded"
                  onClick={handleWithdrawNew}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "linked" ? (
         <LinkedAccounts />
        ) : activeTab === "changePassword" ? (
          <ChangePassword />
        ) : (
          <ChangePin />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
