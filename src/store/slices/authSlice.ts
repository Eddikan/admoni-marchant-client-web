import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  phone_number: string;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
}

interface Business {
  id: string;
  business_name: string;
  contact_phone_number: string;
  contact_email: string;
  slug: string;
  partner_approval: string;
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    user: User;
    business: Business;
  } | null;
  test: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  test: "test",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
