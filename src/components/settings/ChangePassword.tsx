import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

interface FormData {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}
export default function ChangePassword() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.oldPassword)
      validationErrors.oldPassword = "Old Password is required";
    if (!formData.newPassword)
      validationErrors.newPassword = "New Password is required";
    if (!formData.newPassword2)
      validationErrors.newPassword2 = "Please confirm the password";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      showToast("success", " successful!");
    }
  };
  return (
    <div className="m-6 w-1/2">
      <Input
        label="Enter Old Password"
        name="oldPassword"
        type="text"
        value={formData.oldPassword}
        onChange={(e) =>
          setFormData({ ...formData, oldPassword: e.target.value })
        }
        error={errors.oldPassword}
      />
      <Input
        label="Enter New Password"
        name="newPassword"
        type="text"
        value={formData.newPassword}
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.target.value })
        }
        error={errors.newPassword}
      />
      <Input
        label="Re-enter New Password"
        name="newPassword2"
        type="text"
        value={formData.newPassword2}
        onChange={(e) =>
          setFormData({ ...formData, newPassword2: e.target.value })
        }
        error={errors.newPassword2}
      />

      <div className="w-full bg-red-200">
        <Button onClick={handleSubmit} block>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
