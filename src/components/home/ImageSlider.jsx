import { useState, useEffect } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const gotoNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(gotoNext, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className={styles.slider_style}>
      <div className={styles.left_arrow}>
        <i className="fa-solid fa-caret-left" onClick={gotoPrevious}></i>
      </div>
      <div className={styles.right_arrow}>
        <i className="fa-solid fa-caret-right" onClick={gotoNext}></i>
      </div>
      <Link to={"/allProducts"}>
        <button className={`${styles.cta_btn} btn`}>Shop Now</button>
      </Link>
      <div
        className={styles.slide_styles}
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}></div>
    </div>
  );
};

export default ImageSlider;
