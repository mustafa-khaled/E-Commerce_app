import { createSlice } from "@reduxjs/toolkit";

const getInitialCartState = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const cartSlice = createSlice({
  initialState: getInitialCartState(),
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        const productClone = { ...action.payload, quantity: 1 };
        state.push(productClone);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((product) => product.id === itemId);

      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeAll: () => {
      const emptyCart = [];
      localStorage.setItem("cart", JSON.stringify(emptyCart));
      return emptyCart;
    },
  },
});

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
