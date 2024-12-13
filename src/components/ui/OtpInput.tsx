// components/OtpInput.tsx
import React, { useState } from "react";

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
        <div className="flex gap-2 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    );
  };
  
  export default OtpInput;
  