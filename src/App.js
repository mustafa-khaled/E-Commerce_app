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
  Orders,
} from "./components";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signOut } from "./redux/slices/authSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51NFC2lEqzfoGLWiIN9n1yuDkTu4dGySEKNbJ72LBcipk7tYY5qBzMyKHWf6oy8beEp3a30EvEydRaqYslzZxIpm400GckBvb2T"
  );
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
        <Route
          path="checkOut"
          element={
            <Elements stripe={stripePromise}>
              <CheckOut />
            </Elements>
          }
        />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
