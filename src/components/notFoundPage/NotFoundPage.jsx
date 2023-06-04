import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.not_found_page}>
      <div>
        <i className="fa-solid fa-face-dizzy"></i>
        <p>The Page You are Looking For Doesn't Exist</p>
        <Link to={"/"}>
          <button className="btn">Go Home!</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
