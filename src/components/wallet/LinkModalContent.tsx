import { useState } from "react";
import BankDropdown from "../ui/Dropdown";
interface FormData {
  bank: string;
  accountNumber: string;
  accountName: string;
}
// import { useToast } from "@/hooks/useToast"; // Import the hook
import { useToast } from "@/context/ToastContext";
export default function WithdrawalModalContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    bank: "",
    accountNumber: "",
    accountName: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleWithdrawNew = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.bank) validationErrors.bank = "Bank is required";
    if (!formData.accountNumber)
      validationErrors.accountNumber = "Account number is required";
    if (!formData.accountName)
      validationErrors.accountName = "Account name is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      showToast("success", "Withdrawal successful!");
      onClose();
    }
  };

  return (
    <div>
      <div className=" ">
        <div>
          <BankDropdown
            options={[
              {
                id: "gtb",
                name: "Guaranty Trust Bank Plc",
                icon: "/icons/gtb.png",
              },
              {
                id: "wema",
                name: "Wema Bank",
                icon: "/icons/gtb.png",
              },
              {
                id: "opay",
                name: "OPay Digital",
                icon: "/icons/gtb.png",
              },
            ]}
            value={formData.bank}
            onChange={(name) => setFormData({ ...formData, bank: name })}
            error={errors.bank}
          />

          <div className="mb-4">
            <label className="block mb-1 font-medium">Account Number</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm">{errors.accountNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Account Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.accountName}
              onChange={(e) =>
                setFormData({ ...formData, accountName: e.target.value })
              }
            />
            {errors.accountName && (
              <p className="text-red-500 text-sm">{errors.accountName}</p>
            )}
          </div>

          <button
            className="w-full bg-green-500 text-white py-2 rounded"
            onClick={handleWithdrawNew}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
