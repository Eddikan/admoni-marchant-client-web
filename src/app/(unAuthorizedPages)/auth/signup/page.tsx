// pages/signup.tsx
"use client";
import React, { useState } from "react";
import OtpInput from "@/components/ui/OtpInput";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/form/InputField";
const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-10 sm:flex-row items-center sm:justify-between px-6 sm:px-[10px] xl:px-[151px] h-screen w-screen bg-gray-50">
      <div className="w-full sm:w-1/2 sm:pl-20 flex flex-col justify-center text-center sm:text-left mb-6 sm:mb-0">
        <div className="flex justify-center sm:justify-start items-end mb-8 gap-2">
          <div className="relative h-[24px] w-[24px]">
            <Image alt="arrow" src="/icons/AdmoniLogo.png" className="" fill />
          </div>
          <span className="text-4xl relative top-2 -left-1 font-bold">adMONI</span>
        </div>
        <div className="text-2xl sm:text-4xl font-medium text-center sm:text-left text-[#202020] mb-6 sm:mb-[70px]">
          Showcase your
          <br className="hidden sm:block" />
          product to the world
        </div>
        <div className="text-sm flex justify-center sm:justify-start text-gray-500">
          <div className="relative h-[32px] w-[250px] sm:w-[366px]">
            <Image alt="arrow" src="/icons/yourTurn.svg" className="" fill />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[50%] bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {step === 1 ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl sm:text-4xl font-medium mb-4">Create an account</h2>
            <p className="text-sm font-medium mb-6">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-green-600">
                Sign in
              </Link>
            </p>
            <InputField
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange({ ...e, target: { ...e.target, name: "email" } })
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <InputField
                label="First name"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: "firstName" } })
                }
              />
              <InputField
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: "lastName" } })
                }
              />
            </div>
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                handleChange({ ...e, target: { ...e.target, name: "password" } })
              }
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Sign Up
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By clicking Create account, I agree that I have read and accepted the
              <a href="#" className="text-green-600"> Terms of Use </a>
              and
              <a href="#" className="text-green-600"> Privacy Policy</a>.
            </p>
          </form>
        ) : (
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl  text-grey-900 font-semibold mb-4">
              Email Verification
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              A 6-digit verification code has been sent to
              <br />
              <span className="text-adGreen-200 font-medium">{'admoni@gmail.com'}</span>
            </p>
            <OtpInput onVerify={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
