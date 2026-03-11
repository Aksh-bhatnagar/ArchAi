import { configureStore } from "@reduxjs/toolkit";
import floorplanReducer from "./floorplanSlice.ts";

export const store = configureStore({
  reducer: {
    floorplans: floorplanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;