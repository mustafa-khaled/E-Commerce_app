import styles from "./popup.module.css";

const Popup = ({ content }) => {
  return (
    <div className={styles.popup}>
      <i className="fa-solid fa-check"></i>
      {content}
    </div>
  );
};

export default Popup;
