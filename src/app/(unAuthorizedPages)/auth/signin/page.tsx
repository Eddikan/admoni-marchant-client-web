"use client";
// pages/signin.tsx
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0">
        <h1 className="text-4xl font-bold mb-4">adMONI</h1>
        <p className="text-lg font-medium text-gray-600 mb-8">
          Showcase your product to the world
        </p>
        <p className="text-sm text-gray-500">
          3k+ people joined us, now it’s your turn
        </p>
      </div>
      <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">
          New user?{" "}
          <a href="/signup" className="text-green-600">
            Create an account
          </a>
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
            Sign In
          </button>
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </a>
            <div className="flex gap-2">
              <button className="bg-gray-100 py-2 px-4 rounded-md">
                Google
              </button>
              <button className="bg-gray-100 py-2 px-4 rounded-md">
                Facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
