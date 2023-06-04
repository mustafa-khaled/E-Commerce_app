const { createSlice } = require("@reduxjs/toolkit");

const wishListSlice = createSlice({
  initialState: [],
  name: "wishListSlice",
  reducers: {
    addToWishList: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.find(
        (product) => product.id === productToAdd.id
      );

      if (!existingProduct) {
        state.push(productToAdd);
      }
    },
    removeFromWishList: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
