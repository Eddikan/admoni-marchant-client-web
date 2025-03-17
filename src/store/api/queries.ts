import api from "./index";

interface LoginData {
    username: string;
    password: string;
}

interface UserData {
    username: string;
    password: string;
    email?: string;
}

export const queryService = api.injectEndpoints({
    endpoints: (builder: import('@reduxjs/toolkit/query/react').EndpointBuilder<any, any, any>) => ({
        loginUser: builder.mutation<void, LoginData>({
            query: (loginData: LoginData) => ({
                url: `auth/login`,
                method: "POST",
                body: loginData,
            }),
        }),
        registerUser: builder.mutation<void, UserData>({
            query: (userData: UserData) => ({
                url: `auth/v2/users/registerister`,
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = queryService;
