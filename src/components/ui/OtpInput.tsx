// components/OtpInput.tsx
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

type OtpInputProps = {
  onVerify: (code: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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
  };

  return (
    <div>
      <div className="flex gap-6 justify-center mb-40">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 border border-gray-300 rounded-xl text-center text-xl"
          />
        ))}
      </div>

      <Button block onClick={handleSubmit}>
        <Link href="/auth/signin" className="">
        Continue

              </Link>
      </Button>
    </div>
  );
};

export default OtpInput;
