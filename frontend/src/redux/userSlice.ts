import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User =  {
  firstname: string;
  lastname: string;
  email: string;
}

type UserState =  {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  setUser: (state, action: PayloadAction<User | null>) => {
    state.user = action.payload;
  },

  updateUser: (state, action: PayloadAction<Partial<User>>) => {
    if (state.user) {
      state.user = { ...state.user, ...action.payload };
    }
  },

  clearUser: (state) => {
    state.user = null;
  },

  setLoading: (state, action: PayloadAction<boolean>) => {
  state.loading = action.payload;
}
}
});

export const { setUser, updateUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;