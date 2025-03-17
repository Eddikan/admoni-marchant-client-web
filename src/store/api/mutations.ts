import api from "./index";


interface UserData {
    username: string;
    password: string;
    email?: string;
    type:string
}

export const queryService = api.injectEndpoints({
    endpoints: (builder: import('@reduxjs/toolkit/query/react').EndpointBuilder<any, any, any>) => ({
        registerUser: builder.mutation<void, UserData>({
            query: (userData: UserData) => ({
                url: `/auth/v2/users/register`,
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const {
  useRegisterUserMutation,
} = queryService;
