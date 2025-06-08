import api from "./index";


interface UserData {
    username: string;
    password: string;
    email?: string;
    type: string
}

interface LoginData {
    login: string;
    password: string;
}

export const queryService = api.injectEndpoints({
    endpoints: (builder: import('@reduxjs/toolkit/query/react').EndpointBuilder<any, any, any>) => ({
        registerUser: builder.mutation<void, UserData>({
            query: (userData: UserData) => ({
                url: `discount-partners?platform=web`,
                method: "POST",
                body: userData,
            }),
        }),
        loginUser: builder.mutation<void, LoginData>({
            query: (loginData: LoginData) => ({
                url: `discount-partners/login?platform=web`,
                method: "POST",
                body: loginData,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation, // Export loginUser mutation
} = queryService;
