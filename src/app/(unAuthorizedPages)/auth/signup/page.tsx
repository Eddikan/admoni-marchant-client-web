// pages/signup.tsx
"use client";
import React, { useState } from "react";
import OtpInput from "@/components/ui/OtpInput";

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0">
        <h1 className="text-4xl font-bold mb-4">adMONI</h1>
        <p className="text-lg font-medium text-gray-600 mb-8">
          Showcase your product to the world
        </p>
        <p className="text-sm text-gray-500">3k+ people joined us, now it’s your turn</p>
      </div>
      <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg p-8">
        {step === 1 ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
            <p className="text-sm text-gray-500 mb-6">
              Already have an account? <a href="/signin" className="text-green-600">Sign in</a>
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
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
          <div>
            <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
            <p className="text-sm text-gray-500 mb-6">
              A 6-digit verification code has been sent to your email.
            </p>
            <OtpInput onVerify={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
