// pages/signup.tsx
"use client";
import React, { useState } from "react";
import OtpInput from "@/components/ui/OtpInput";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/form/InputField";
import { useRegisterUserMutation } from "@/store/api/mutations";
import {  useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { setCookie } from "cookies-next"; // Import setCookie

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useAppDispatch(); // Initialize dispatch

  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    type: "merchant",
    email: "",
    first_name: "",
    last_name: "",
    business_name: "",
  });

  const [errors, setErrors] = useState({
    phone_number: "", // Renamed phoneNumber to phone_number
  });

  const validatePhoneNumber = (phone: string) => {
    const africanPhoneRegex = /^\+?2[0-9]{8,13}$/; // Regex for African phone numbers
    return africanPhoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone_number") {
      if (!validatePhoneNumber(value)) {
        setErrors({
          ...errors,
          phone_number: "Invalid phone number, must be +234 format", // Updated to phone_number
        });
      } else {
        setErrors({ ...errors, phone_number: "" }); // Updated to phone_number
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.phone_number) {
      console.error("Fix validation errors before submitting.");
      return;
    }
    try {
      const response: any = await registerUser(formData).unwrap(); // Use updated formData structure
      const user = response.data;
      // Store token in a cookie
      setCookie("admoni-token", user.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      }); // 1 day expiration

      dispatch(login(user.data)); // Dispatch login action with user data
      // setStep(2);
      // go to dashboard from here
      setStep(3);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:flex-row items-center sm:justify-between px-6 sm:px-[10px] xl:px-[151px] h-screen w-screen bg-gray-50">
      <div className="w-full sm:w-1/2 sm:pl-20 flex flex-col justify-center text-center sm:text-left mb-6 sm:mb-0">
        <div className="flex justify-center sm:justify-start items-end mb-8 gap-2">
          <div className="relative h-[24px] w-[24px]">
            <Image alt="arrow" src="/icons/AdmoniLogo.png" className="" fill />
          </div>
          <span className="text-4xl relative top-2 -left-1 font-bold">
            adMONI
          </span>
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
            <h2 className="text-2xl sm:text-4xl font-medium mb-4">
              Create an account
            </h2>
            <p className="text-sm font-medium mb-6">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-green-600">
                Sign in
              </Link>
            </p>
            <InputField
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "username" },
                })
              }
            />
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
                label="First Name"
                type="text"
                value={formData.first_name} // Updated to first_name
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "first_name" }, // Updated to first_name
                  })
                }
              />
              <InputField
                label="Last Name"
                type="text"
                value={formData.last_name} // Updated to last_name
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "last_name" }, // Updated to last_name
                  })
                }
              />
            </div>
            <InputField
              label="Business Name"
              type="text"
              value={formData.business_name} // Updated to business_name
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "business_name" }, // Updated to business_name
                })
              }
            />
            <InputField
              label="Phone Number"
              type="text"
              marginBottom="mb-2"
              value={formData.phone_number} // Updated to phone_number
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "phone_number" }, // Updated to phone_number
                })
              }
            />
            {errors.phone_number && ( // Updated to phone_number
              <div className="text-red-500 mb-4 pl-2 text-sm">
                {errors.phone_number}
              </div> // Updated to phone_number
            )}
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "password" },
                })
              }
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By clicking Create account, I agree that I have read and accepted
              the
              <a href="#" className="text-green-600">
                {" "}
                Terms of Use{" "}
              </a>
              and
              <a href="#" className="text-green-600">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </form>
        ) : (
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl text-grey-900 font-semibold mb-4">
              Email Verification
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              A 6-digit verification code has been sent to
              <br />
              <span className="text-adGreen-200 font-medium">
                {formData.email}
              </span>{" "}
              {/* Use user's email */}
            </p>
            <OtpInput onVerify={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
