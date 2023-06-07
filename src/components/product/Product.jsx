import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cart-slice";
import { addToWishList } from "../../redux/slices/wishList-slice";
import Popup from "../popup/Popup";

const Product = ({ product }) => {
  const { imageCover, title, description, price, id } = product;
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const isWishListed = wishList.some((item) => item.id === id);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 1000);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishList(product));
    setShowWishlistPopup(true);
    setTimeout(() => {
      setShowWishlistPopup(false);
    }, 1000);
  };

  return (
    <div className={styles.product}>
      {showCartPopup && <Popup content="Product added to cart successfully" />}
      {showWishlistPopup && <Popup content="Added to wishlist successfully" />}
      <i
        className={`fa-regular fa-heart ${styles.heart_icon} ${
          isWishListed ? styles.wishlisted : ""
        }`}
        onClick={handleAddToWishlist}></i>
      <Link to={`/product/${id}`}>
        <img src={imageCover} alt="Product" className={styles.product_image} />
        <h3>{title.slice(0, 30)}...</h3>
        <p>{description.slice(0, 50)}...</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </Link>

      <button className="btn" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
