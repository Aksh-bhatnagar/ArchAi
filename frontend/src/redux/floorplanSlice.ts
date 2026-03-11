import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchFloorplans = createAsyncThunk(
  "floorplans/fetch",
  async () => {
    const res = await api.get("/architech/my-floorplans");
    return res.data.data;
  }
);

interface FloorplanState {
  data: any[];
  loading: boolean;
  fetched: boolean;
}

const initialState: FloorplanState = {
  data: [],
  loading: false,
  fetched: false,
};

const floorplanSlice = createSlice({
  name: "floorplans",
  initialState,
  reducers: {
  addFloorplan: (state, action) => {
    state.data.unshift(action.payload);
  },
  removeFloorplan: (state, action) => {
  state.data = state.data.filter(plan => plan._id !== action.payload);
  },
  renameFloorplan: (state, action) => {
  const { id, name } = action.payload;

  const plan = state.data.find(p => p._id === id);

  if (plan) {
    plan.projectName = name;
  }
}

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFloorplans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFloorplans.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.fetched = true;
      })
      .addCase(fetchFloorplans.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default floorplanSlice.reducer;
export const { addFloorplan, removeFloorplan, renameFloorplan } = floorplanSlice.actions;
