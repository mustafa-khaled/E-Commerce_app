import { useDispatch, useSelector } from "react-redux";
import styles from "../cart/cart.module.css";
import { removeAll, removeFromCart } from "../../redux/slices/cart-slice";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import checkOutStyles from "./checkOut.module.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const elements = useElements();
  const [error, setError] = useState(null);

  // State to manage the quantity of each product
  const [productQuantities, setProductQuantities] = useState(
    cart.reduce((quantities, product) => {
      quantities[product.id] = product.quantity;
      return quantities;
    }, {})
  );

  // Function to handle changes in the product quantity
  const handleQuantityChange = (productId, quantity) => {
    if (Number.isNaN(quantity) || quantity < 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 1,
      }));
    } else {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: quantity,
      }));
    }
  };

  //  Get Total Price
  const hasItems = cart.length > 0;
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * productQuantities[product.id];
    return acc;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setError("Please login to submit your order.");
      return;
    }

    // Check if card field is empty
    const cardElement = elements.getElement("cardNumber");
    if (!cardElement || cardElement.isEmpty) {
      setError("Please enter your card number.");
      return;
    }

    navigate("/orders");
    dispatch(removeAll());
  };

  const handleChange = () => {
    setError(null);
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
                <input
                  type="number"
                  min="1"
                  value={productQuantities[product.id]}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.id,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className={checkOutStyles.quantity_input}
                />

                <h4>Price: ${product.price * productQuantities[product.id]}</h4>
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
            {error && <div className={checkOutStyles.error}>{error}</div>}
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
