import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk(
  "detailsSlice/fetchProductDetails",
  async (id) => {
    const res = await fetch(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    const data = await res.json();
    return data.data;
  }
);

const detailsSlice = createSlice({
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  name: "detailsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default detailsSlice.reducer;
