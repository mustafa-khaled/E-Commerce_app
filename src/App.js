import { Route, Routes } from "react-router-dom";
import {
  Header,
  Login,
  Home,
  AllProducts,
  ProductDetails,
  Cart,
  WishList,
  NotFoundPage,
  MensClothing,
  WomensClothing,
  Electronics,
  About,
  Footer,
  CheckOut,
} from "./components";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signOut } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, email } = authUser;
        const serializedUser = { uid, email };
        dispatch(signInSuccess(serializedUser));
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="allProducts" element={<AllProducts />} />
        <Route path="mensClothing" element={<MensClothing />} />
        <Route path="womensClothing" element={<WomensClothing />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishList" element={<WishList />} />
        <Route path="checkOut" element={<CheckOut />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
