import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getShops } from "../../services/shopService";

const initialState = {
  isSuccess: false,
  shops: null,
  isFetching: false,
  isError: false,
  error: null,
};

export const getAllShops = createAsyncThunk(
  "shop/getAllShops",
  async (args = "", { rejectWithValue }) => {
    try {
      const data = await getShops();
      if (data.status !== "success") return rejectWithValue(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearShopState: (state) => {
      state.isSuccess = false;
      state.shops = null;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
  },
  extraReducers: {
    [getAllShops.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.shops = null;
      return state;
    },
    [getAllShops.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.shops = payload.data.shops;
      state.isFetching = false;
      state.isError = false;
      state.error = null;
      return state;
    },
    [getAllShops.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.shops = null;
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
      return state;
    },
  },
});

export const { clearShopState } = shopSlice.actions;
export default shopSlice.reducer;
