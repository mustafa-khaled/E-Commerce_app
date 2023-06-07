import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/category-slice";
import Loading from "../loading/Loading";
import styles from "./trendingProducts.module.css";
import Popup from "../popup/Popup";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cart-slice";

const TrendingProducts = () => {
  const products = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();
  const [showCartPopup, setShowCartPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory("6439d2d167d9aa4ca970649f"));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const firstTenProducts = products ? products.slice(0, 10) : [];

  return (
    <div>
      {showCartPopup && <Popup content="Added successfully" />}
      <h2 className="home_heading">Trending Products</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        navigation
        className={styles.product_swiper}
        breakpoints={{
          500: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}>
        {firstTenProducts.map((product) => (
          <SwiperSlide key={product.id} className={styles.product_container}>
            <Link to={`/product/${product.id}`}>
              <span>Hot</span>
              <img src={product.imageCover} alt={product.title} />
              <h4>{product.title.slice(0, 30)}...</h4>
            </Link>
            <button className="btn" onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
