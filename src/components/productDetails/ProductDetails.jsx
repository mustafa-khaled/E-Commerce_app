import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slices/cart-slice";
import { fetchProductDetails } from "../../redux/slices/details-slice";
import Loading from "../loading/Loading";
import styles from "./productDetails.module.css";
import Popup from "../popup/Popup";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let param = useParams();
  const products = useSelector((state) => state.productDetails.data);
  const loading = useSelector((state) => state.productDetails.loading);
  const error = useSelector((state) => state.productDetails.error);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(param.id));
  }, [dispatch, param.id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className={`${styles.product_details} container`}>
      {showPopup && <Popup content="Added successfully!" />}
      {products && (
        <div className={styles.images_container}>
          <img
            src={selectedImage || products.imageCover}
            alt={products.title}
            className={styles.main_image}
          />
          <div>
            {products.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={products.title}
                className={`${styles.small_images} ${
                  selectedImage === img ? styles.selected_image : ""
                }`}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </div>
      )}
      {products && (
        <div className={styles.product_text}>
          <h2>{products.title}</h2>
          <p>{products.description}</p>
          <h3>{products.price} $</h3>
          <button className="btn" onClick={() => handleAddToCart(products)}>
            Add To Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
