import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";

import { EUserRole, TTokenizedUser } from "../rtk-apis/auth/auth.types";

interface IAuthenticatedUser {
  userId: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  userType: EUserRole | null;
}

const initialState: IAuthenticatedUser = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  gender: null,
  userType: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TTokenizedUser>) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.gender = action.payload.gender;
      state.userType = action.payload.user_type;
    },

    clearUser: (state) => {
      state.userId = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.gender = null;
      state.userType = null;
    },
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;

export const selectUserId = (state: TRootState) => state.authenticatedUser.userId;

export default authenticatedUserSlice.reducer;
