import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (id) => {
    const res = await fetch(
      "https://route-ecommerce.onrender.com/api/v1/products"
    );
    const data = await res.json();
    return data.data;
  }
);

const productsSlice = createSlice({
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  name: "productsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
