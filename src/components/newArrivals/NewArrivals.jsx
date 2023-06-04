import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/category-slice";
import Loading from "../loading/Loading";
import styles from "./newArrivals.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cart-slice";

const NewArrivalsProducts = () => {
  const products = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory("6439d2d167d9aa4ca970649f"));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const lastTenProducts = products ? products.slice(10, 20) : [];

  return (
    <div className={styles.new_arrivals_container}>
      <h2 className="home_heading"> New Arrivals</h2>
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
        {lastTenProducts.map((product) => (
          <SwiperSlide key={product.id} className={styles.product_container}>
            <Link to={`/product/${product.id}`}>
              <span>New</span>
              <img src={product.imageCover} alt={product.title} />
              <h4>{product.title.slice(0, 30)}...</h4>
            </Link>
            <button
              className="btn"
              onClick={() => dispatch(addToCart(product))}>
              Add To Cart
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrivalsProducts;
