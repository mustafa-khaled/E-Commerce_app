import { createSlice } from "@reduxjs/toolkit";

const getInitialWishListState = () => {
  const storedWishList = localStorage.getItem("wishlist");
  return storedWishList ? JSON.parse(storedWishList) : [];
};

const wishListSlice = createSlice({
  initialState: getInitialWishListState(),
  name: "wishListSlice",
  reducers: {
    addToWishList: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.find(
        (product) => product.id === productToAdd.id
      );

      if (!existingProduct) {
        state.push(productToAdd);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    removeFromWishList: (state, action) => {
      const productId = action.payload.id;
      const updatedWishList = state.filter(
        (product) => product.id !== productId
      );
      state.splice(0, state.length, ...updatedWishList); // Update the state directly
      localStorage.setItem("wishlist", JSON.stringify(updatedWishList)); // Update the local storage
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
