import { useDispatch, useSelector } from "react-redux";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cart-slice";
import { addToWishList } from "../../redux/slices/wishList-slice";

const Product = ({ product }) => {
  const { imageCover, title, description, price, id } = product;
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const isWishListed = wishList.some((item) => item.id === id);

  return (
    <div className={styles.product}>
      <i
        className={`fa-regular fa-heart ${styles.heart_icon} ${
          isWishListed ? styles.wishlisted : ""
        }`}
        onClick={() => dispatch(addToWishList(product))}></i>
      <Link to={`/product/${id}`}>
        <img src={imageCover} alt="Product" className={styles.product_image} />
        <h3>{title.slice(0, 30)}...</h3>
        <p>{description.slice(0, 50)}...</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </Link>

      <button className="btn" onClick={() => dispatch(addToCart(product))}>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
