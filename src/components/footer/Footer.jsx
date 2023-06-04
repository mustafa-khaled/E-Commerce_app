import Styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <div className={`${Styles.first} container`}>
        <div className={Styles.box}>
          <i className="fa-solid fa-truck-fast"></i>
          <div>
            <h5>Free Delivery</h5>
            <p>Free in Cairo & Giza</p>
          </div>
        </div>

        <div className={Styles.box}>
          <i className="fa-regular fa-credit-card"></i>
          <div>
            <h5>Safe Payment</h5>
            <p>100% secure payment</p>
          </div>
        </div>

        <div className={Styles.box}>
          <i className="fa-solid fa-comments"></i>
          <div>
            <h5>Help Center</h5>
            <p>Dedicated 24/6 support</p>
          </div>
        </div>
        <div className={Styles.box}>
          <i className="fa-solid fa-hand-holding"></i>
          <div>
            <h5>Shop With Confidence</h5>
            <p>If goods have problems</p>
          </div>
        </div>
      </div>
      <div className={`${Styles.second} container`}>
        <ul>
          <li>About Exp</li>
          <li>
            Exp is a company specialized in selling electronics accessories with
            scrutiny in providing only high quality products and a real
            guarantee.
          </li>
          <li>Phone: 01151747091</li>
        </ul>
        <ul>
          <li>Collections</li>
          <li>All collections</li>
          <li>Computer </li>
          <li>Smart Phone </li>
          <li>Accessories </li>
          <li>Wearables </li>
        </ul>
        <ul>
          <li>Quick Links</li>
          <li>About Us</li>
          <li>Contact US </li>
          <li>My Account </li>
          <li>FAQs </li>
        </ul>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/the-mustafa-khaled/"
              target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mustafa-khaled?tab=repositories"
              target="_blank">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
      <p className={`${Styles.copy_right} container`}>
        Copyright ©{" "}
        <a
          href="https://www.linkedin.com/in/the-mustafa-khaled/"
          target="_blank">
          Mustafa Khaled
        </a>
        . all rights reserved.
      </p>
    </div>
  );
};

export default Footer;
