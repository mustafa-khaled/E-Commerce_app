import { useDispatch, useSelector } from "react-redux";
import styles from "./wishList.module.css";
import { addToCart } from "../../redux/slices/cart-slice";
import { removeFromWishList } from "../../redux/slices/wishList-slice";
import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../popup/Popup";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const hasItems = wishList.length > 0;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 1000);
  };

  return (
    <>
      {hasItems ? (
        <div className={`${styles.wish_list_container} container`}>
          {wishList.map((product) => (
            <div key={product.id} className={styles.wish_list_product}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className={styles.wish_list_image}
                />
                <h1>{product.title}</h1>
              </Link>

              <button className="btn" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
              <button
                className={styles.delete_btn}
                onClick={() => dispatch(removeFromWishList(product))}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <i className="fa-regular fa-face-frown"></i>
          <h2>Your Wish List is empty</h2>
        </div>
      )}
      {showCartPopup && <Popup content="Added successfully" />}
    </>
  );
};

export default WishList;
