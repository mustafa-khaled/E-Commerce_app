import aboutImage from "../../assets/aboutImage.png";
import char1 from "../../assets/char1.jpg";
import char2 from "../../assets/char2.jpg";
import char3 from "../../assets/char3.jpg";
import char4 from "../../assets/char4.jpg";
import char5 from "../../assets/char5.jpg";
import char6 from "../../assets/char6.jpg";
import char7 from "../../assets/char7.jpg";

import Styles from "./about.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function About() {
  return (
    <div className={`${Styles.about_content} container`}>
      <div className={Styles.about_container}>
        <div>
          <span>About Exp</span>
          <h3>Hello, With 10+ Years Of Experience</h3>
          <p>
            Tech is a company specialized in selling electronics accessories
            with scrutiny in providing only high quality products and a real
            guarantee of replacement for any defective product. No product is
            sold without a warranty.
          </p>
        </div>
        <div>
          <img src={aboutImage} alt="About" className={Styles.about_img} />
        </div>
      </div>
      <h2>Our Team</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        className={Styles.about_slider}
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
        <SwiperSlide className={Styles.slide}>
          <img src={char1} alt="char" className={Styles.char_img} />
          <h4>Adam Jonson</h4>
          <p>Founder & CEO</p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char2} alt="char" className={Styles.char_img} />
          <h4>Marry Hudson</h4>
          <p>UI / UX Designer</p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char3} alt="char" className={Styles.char_img} />
          <h4>Bob Larson</h4>
          <p>Front End Developer</p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char4} alt="char" className={Styles.char_img} />
          <h4>Sarah Quinton</h4>
          <p>Back End Developer</p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char5} alt="char" className={Styles.char_img} />
          <h4>Chip Lutton</h4>
          <p>Graphic Designer</p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char7} alt="char" className={Styles.char_img} />
          <h4>Lana Steiner</h4>
          <p>Marketing Specialist </p>
        </SwiperSlide>
        <SwiperSlide className={Styles.slide}>
          <img src={char6} alt="char" className={Styles.char_img} />
          <h4>Will Patton</h4>
          <p>Software Engineer </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default About;
