import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import cartSlice from "./slices/cart-slice";
import wishListSlice from "./slices/wishList-slice";
import categorySlice from "./slices/category-slice";
import detailsSlice from "./slices/details-slice";
import authSlice from "./slices/authSlice";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const middleware = [
  ...customizedMiddleware,
  createSerializableStateInvariantMiddleware(),
];

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    productDetails: detailsSlice,
    category: categorySlice,
    cart: cartSlice,
    wishList: wishListSlice,
  },
  middleware,
});
