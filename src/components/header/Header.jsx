import React, { useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/11010.png";
import { useSelector } from "react-redux";

const Header = () => {
  const cartLength = useSelector((state) => state.cart.length);
  const wishListLength = useSelector((state) => state.wishList.length);

  const [showSideBar, setShowSideBar] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
    setShowOverlay(!showOverlay);
  };

  return (
    <header>
      <div className={`${styles.header} container`}>
        <div onClick={handleToggleSideBar}>
          <i className={`fa-solid ${showSideBar ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <div className={styles.logo_holder}>
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className={styles.logo_image} />
          </Link>
        </div>

        <div className={styles.nav_icons}>
          <Link to={"/login"}>
            <div>
              <i className="fa-regular fa-user"></i>
            </div>
          </Link>

          <Link to={"/orders"}>
            <div>Orders</div>
          </Link>
          <Link to={"/wishList"}>
            <div>
              <i className="fa-regular fa-heart"></i>
              {wishListLength > 0 ? (
                <span className={styles.wish_list}>{wishListLength}</span>
              ) : null}
            </div>
          </Link>
          <Link to={"/cart"}>
            <div>
              <i className="fa-solid fa-basket-shopping"></i>
              {cartLength > 0 ? (
                <span className={styles.cart_number}>{cartLength}</span>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.side_bar} ${
          showSideBar ? styles.show_side_bar : ""
        }`}>
        <ul>
          <li>
            <Link to={"/allProducts"}>Shop Now</Link>
          </li>
          <li>
            <Link to={"/mensClothing"}>Men's Clothing</Link>
          </li>
          <li>
            <Link to={"/womensClothing"}>Women's Clothing</Link>
          </li>
          <li>
            <Link to={"/electronics"}>Electronics</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.overlay} ${
          showOverlay ? styles.active_overlay : ""
        }`}
        onClick={handleToggleSideBar}></div>
    </header>
  );
};

export default Header;
