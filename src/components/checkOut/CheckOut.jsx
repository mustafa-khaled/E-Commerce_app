import { useDispatch, useSelector } from "react-redux";
import styles from "../cart/cart.module.css";
import { removeFromCart } from "../../redux/slices/cart-slice";
import { CardElement } from "@stripe/react-stripe-js";

const CheckOut = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const hasItems = cart.length > 0;
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {};

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
          <div className={styles.total}>
            <h3>Personal Info: Mustafa</h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            {/* Stripe Card */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <button className="btn">Order Now</button>
            </form>
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
