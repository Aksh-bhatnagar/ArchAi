import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import floorplanReducer from "./floorplanSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    floorplans: floorplanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;