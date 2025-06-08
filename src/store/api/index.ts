import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast"; // Assuming you're using react-toastify for toasts
import { getCookie } from "cookies-next"; // Import getCookie

const logOut = async () => {
  alert('odd')
  localStorage.clear();
  window.location.href = "/auth/signin";
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
  if (result?.error as any) {
    // Show a toast for the error
    if (result?.error?.data && typeof result.error.data === "object" && "message" in result.error.data) {
      console.log("errrr", (result.error.data as { message: string }).message);
    } else {
      console.log("errrr", result?.error?.data);
    }
    if (result?.error?.status == 401) {
      // unauthorized
      // logout
    //   toast.error(result?.error?.data?.message);
      // api.dispatch({ type: "RESET_STATE" });
      // logOut();
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
