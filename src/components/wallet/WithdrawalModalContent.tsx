import { useState } from "react";
import Image from "next/image";
import BankDropdown from "./BankDropdown";
interface Account {
  id: number;
  bankName: string;
  icon: string;
  accountNumber: string;
  accountHolder: string;
}

interface FormData {
  amount: string;
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
  const [activeTab, setActiveTab] = useState<"linked" | "new">("linked");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    bank: "",
    accountNumber: "",
    accountName: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [addToLinked, setAddToLinked] = useState<boolean>(false);

  const linkedAccounts: Account[] = [
    {
      id: 1,
      bankName: "Guaranty Trust Bank Plc",
      icon: "/icons/gtb.png",
      accountNumber: "1234567890",
      accountHolder: "Tony Tones",
    },
    {
      id: 2,
      bankName: "Wema Bank",
      accountNumber: "1234567891",
      icon: "/icons/gtb.png",

      accountHolder: "Tony Tones",
    },
    {
      id: 3,
      bankName: "OPay Digital",
      accountNumber: "1234567892",
      icon: "/icons/gtb.png",

      accountHolder: "Tony Tones",
    },
  ];

  const handleWithdrawLinked = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.amount) {
      validationErrors.amount = "Amount is required";

      setErrors(validationErrors);
      return;
    }
    if (selectedAccount) {
      console.log("Selected Account:", selectedAccount);
      showToast("success", "Withdrawal successful!");
      onClose();
    } else {
      showToast("error", "Please select an account !");
    }
  };

  const handleWithdrawNew = () => {
    const validationErrors: Partial<FormData> = {};
    if (!formData.amount) validationErrors.amount = "Amount is required";
    if (!formData.bank) validationErrors.bank = "Bank is required";
    if (!formData.accountNumber)
      validationErrors.accountNumber = "Account number is required";
    if (!formData.accountName)
      validationErrors.accountName = "Account name is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount}</p>
        )}
      </div>
      <p className="text-center text-lg font-medium mb-3">Select Account</p>
      <div className="flex">
        <button
          className={`flex-1 p-2 ${
            activeTab === "linked"
              ? "border-b-2 bg-adGreen-150 border-green-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("linked")}
        >
          Linked Account
        </button>
        <button
          className={`flex-1 p-2 ${
            activeTab === "new"
              ? "border-b-2 bg-adGreen-150 border-green-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Account
        </button>
      </div>
      <div className="py-6 ">
        {activeTab === "linked" && (
          <div>
            <ul className="flex flex-col gap-4">
              {linkedAccounts.map((account) => (
                <li
                  key={account.id}
                  className={`p-2 border flex gap-3 rounded-xl mb-2 cursor-pointer ${
                    selectedAccount?.id === account.id
                      ? "border-green-500 "
                      : "border-grey-500"
                  }`}
                  onClick={() => setSelectedAccount(account)}
                >
                  <Image
                    alt="bank"
                    src={account.icon}
                    className=""
                    width={66}
                    height={66}
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{account.bankName}</p>
                    <p>{account.accountNumber}</p>
                    <p>{account.accountHolder}</p>
                  </div>
                  <Image
                    alt="bank"
                    src={
                      selectedAccount?.id === account.id
                        ? "/icons/activeCheckBox.svg"
                        : "/icons/inActiveCheckBox.svg"
                    }
                    className="ml-auto"
                    width={24}
                    height={24}
                  />
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-green-500 text-white py-2 rounded mt-4"
              onClick={handleWithdrawLinked}
            >
              Withdraw
            </button>
          </div>
        )}
        {activeTab === "new" && (
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
            <div
              className="flex items-center gap-2 mb-6"
              onClick={() => setAddToLinked((prev) => !prev)}
            >
              <input
                type="checkbox"
                className="border border-grey-500 rounded"
                checked={addToLinked}
              />
              Add to linked account
            </div>
            <button
              className="w-full bg-green-500 text-white py-2 rounded"
              onClick={handleWithdrawNew}
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
