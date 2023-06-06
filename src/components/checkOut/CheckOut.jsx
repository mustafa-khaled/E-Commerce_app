import { useDispatch, useSelector } from "react-redux";
import styles from "../cart/cart.module.css";
import { removeAll, removeFromCart } from "../../redux/slices/cart-slice";
import { CardElement } from "@stripe/react-stripe-js";
import checkOutStyles from "./checkOut.module.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  //  Get Total Price
  const hasItems = cart.length > 0;
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/orders");
    dispatch(removeAll());
  };

  const handleChange = (e) => {
    setError(error ? error.message : "");
  };

  return (
    <>
      {hasItems ? (
        <div className={`${styles.cart} container`}>
          {cart.map((product) => (
            <div className={styles.product_container} key={product.id}>
              <div>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className={styles.cart_image}
                />
              </div>

              <div className={styles.product_text}>
                <h4>{product.title.slice(0, 30)}</h4>
              </div>

              <div>
                <h4 className={styles.quantity}> {product.quantity} : Items</h4>
                <h4>Price: ${product.price * product.quantity}</h4>
              </div>

              <div>
                <button
                  onClick={() => dispatch(removeFromCart(product))}
                  className={styles.delete}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className={`${styles.total} ${checkOutStyles.total}`}>
            <h3>Personal Info: Mustafa</h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            {/* Stripe Card */}
            <div className={checkOutStyles.check_out_form}>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <button
                  className={`btn ${checkOutStyles.form_btn}`}
                  type="submit">
                  Order Now
                </button>
              </form>
            </div>
            {error && <div>{error}</div>}
          </div>
        </div>
      ) : (
        <div className="empty">
          <i className="fa-regular fa-face-frown"></i>
          <h2>No Products</h2>
        </div>
      )}
    </>
  );
};

export default CheckOut;
