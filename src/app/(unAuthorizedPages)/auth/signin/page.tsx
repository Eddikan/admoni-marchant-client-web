// pages/signup.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import InputField from "@/components/form/InputField";
import { useLoginUserMutation } from "@/store/api/mutations";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next"; // Import setCookie

const SignUpPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation<any>(); // Add loginUser mutation with correct type
  const dispatch = useAppDispatch(); // Initialize dispatch
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("formData:", formData); // Log formData for debugging
      const payload = { login: formData.email, password: formData.password };
      const response: any = await loginUser(payload).unwrap(); // Ensure user is typed correctly
      const user = response.data;
      console.log("User data received:", user);

      // Store token in a cookie
      setCookie("admoni-token", user.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      }); // 1 day expiration

      // Dispatch user and business information to the store
      if (user && user.user && user.business) {
        dispatch(login({ user: user.user, business: user.business }));
      }

      router.push("/dashboard"); // Redirect to dashboard after successful login
      console.log("Login successful:", user);
    } catch (error) {
      console.error("Login failed:", error);
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
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl sm:text-4xl font-medium mb-4">Sign in</h2>
          <p className="text-sm font-medium mb-6">
            New user?
            <Link href="/auth/signup" className="text-green-600 ml-1">
              Create an account
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
          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              handleChange({ ...e, target: { ...e.target, name: "password" } })
            }
          />
          <div className="flex justify-between items-center mb-4">
            <Link href="#" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" block loading={isLoading}>
            Sign in
          </Button>

          <hr className="my-10" />
          {/* <div className="grid grid-cols-2 gap-2">
            <div className="py-2 px-4 border rounded-xl flex gap-4 cursor-pointer items-center justify-center">
              <div className="relative h-[16px] w-[16px]">
                <Image alt="arrow" src="/icons/google.png" className="" fill />
              </div>
              Google
            </div>
            <div className="py-2 px-4 border rounded-xl flex gap-4 cursor-pointer items-center justify-center">
              <div className="relative h-[16px] w-[16px]">
                <Image
                  alt="arrow"
                  src="/icons/facebook.png"
                  className=""
                  fill
                />
              </div>
              Facebook
            </div>
          </div> */}
          <p className="text-xs text-gray-500 mt-4">
            By clicking Sign in, I agree that I have read and accepted the
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
      </div>
    </div>
  );
};

export default SignUpPage;
