import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cart.module.css";
import { removeFromCart } from "../../redux/slices/cart-slice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const hasItems = cart.length > 0;
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  return (
    <>
      {hasItems ? (
        <div className={`${styles.cart} container`}>
          <div className={styles.total}>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <Link to={"/checkOut"}>
              <button className="btn">Proceed to Buy</button>
            </Link>
          </div>
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
                <h4>{product.title.slice(0, 10)}</h4>
                <p>{product.description.slice(0, 20)}</p>
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
        </div>
      ) : (
        <div className="empty">
          <i className="fa-regular fa-face-frown"></i>
          <h2>The cart is empty</h2>
        </div>
      )}
    </>
  );
};

export default Cart;
