import styles from "./orders.module.css";

const Orders = () => {
  return (
    <div className={styles.order}>
      <div className={`container ${styles.Orders_container}`}>
        <h2>Your Orders</h2>
      </div>
    </div>
  );
};

export default Orders;
