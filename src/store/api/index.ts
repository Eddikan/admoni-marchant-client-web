import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast"; // Assuming you're using react-toastify for toasts
import { getCookie } from "cookies-next"; // Import getCookie

const logOut = async () => {
  localStorage.clear();
  window.location.href = "/login";
};
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("admoni-token"); // Retrieve token from cookies
    headers.set("Accept", `application/json`);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create a custom baseQuery that catches errors
const baseQueryWithErrorHandler = async (args:any, api:any, extraOptions:any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error) {
    // Show a toast for the error
    console.log("errrr", result);
    if (result?.error?.status == 401) {
      // unauthorized
      // logout
    //   toast.error(result?.error?.data?.message);
      api.dispatch({ type: "RESET_STATE" });
      logOut();
    }
    // result?.error?.data?.errors?.forEach((message) => {
    //   toast.error(message);
    // });
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: [
   
  ],
  endpoints: () => ({}),
});

export default api;
