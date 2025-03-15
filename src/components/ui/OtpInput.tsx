// components/OtpInput.tsx
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type OtpInputProps = {
  onVerify: (code: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    onVerify(otp.join(""));
    if (router) {
      router.push("/auth/signin");
    } else {
      console.error("Router is not mounted.");
    }
  };

  return (
    <div>
      <div className="flex px-1 gap-6 justify-center mb-40">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 xl:w-12 h-10 xl:h-12 border border-gray-300 rounded-xl text-center text-xl"
          />
        ))}
      </div>

      <Button block onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
};

export default OtpInput;
