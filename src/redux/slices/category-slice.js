import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk(
  "categorySlice/fetchProducts",
  async (id) => {
    const res = await fetch(
      `https://route-ecommerce.onrender.com/api/v1/products?category=${id}`
    );
    const data = await res.json();
    return data.data;
  }
);

const categorySlice = createSlice({
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  name: "categorySlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
