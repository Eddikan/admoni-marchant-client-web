import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

interface FormData {
  oldPin: string;
  newPin: string;
  newPin2: string;
}
export default function ChangePin() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    oldPin: "",
    newPin: "",
    newPin2: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.oldPin)
      validationErrors.oldPin = "Old Pin is required";
    if (!formData.newPin)
        validationErrors.newPin = "New Pin is required";
    if (!formData.newPin2)
      validationErrors.newPin2 = "Please confirm the pin";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      showToast("success", " successful!");
    }
  };
  return (
    <div className="m-6 w-1/2">
      <Input
        label="Enter Old Pin"
        name="oldPin"
        type="text"
        value={formData.oldPin}
        onChange={(e) =>
          setFormData({ ...formData, oldPin: e.target.value })
        }
        error={errors.oldPin}
      />
      <Input
        label="Enter New Pin"
        name="newPin"
        type="text"
        value={formData.newPin}
        onChange={(e) =>
          setFormData({ ...formData, newPin: e.target.value })
        }
        error={errors.newPin}
      />
      <Input
        label="Re-enter New Pin"
        name="newPin2"
        type="text"
        value={formData.newPin2}
        onChange={(e) =>
          setFormData({ ...formData, newPin2: e.target.value })
        }
        error={errors.newPin2}
      />

      <div className="w-full bg-red-200">
        <Button onClick={handleSubmit} block>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
