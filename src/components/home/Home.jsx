import styles from "./home.module.css";
import ImageSlider from "./ImageSlider";
import TrendingProducts from "../trendingProducts/TrendingProducts";
import NewArrivalsProducts from "../newArrivals/NewArrivals";

// Slider Images
import imageOne from "../../assets/homeImage1.jpg";
import imageTwo from "../../assets/homeImage2.jpg";
import imageThree from "../../assets/homeImage3.jpg";
import imageFour from "../../assets/homeImage4.jpg";
import imageFive from "../../assets/homeImage5.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const slides = [
    { url: imageOne, title: "imageOne" },
    { url: imageTwo, title: "imageTwo" },
    { url: imageThree, title: "imageThree" },
    { url: imageFour, title: "imageFour" },
    { url: imageFive, title: "imageFive" },
  ];

  return (
    <div className={`${styles.home} container`}>
      <div className={`${styles.container_styles} `}>
        <ImageSlider slides={slides} />
      </div>
      <div className={`${styles.boxes} `}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <TrendingProducts />
      <div className={styles.features_div}>
        <h2>Incredible Features & Fresh Mobile Accessories</h2>
        <Link to={"/allProducts"}>
          <button className="btn">Shop Now</button>
        </Link>
      </div>
      <NewArrivalsProducts />
    </div>
  );
};

export default Home;
