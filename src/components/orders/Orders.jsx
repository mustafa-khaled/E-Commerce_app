import { useState } from "react";
import styles from "./orders.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Order from "./Order";

const Orders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderedRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className={styles.order}>
      <div className={`container ${styles.Orders_container}`}>
        <h2>Your Orders</h2>
        <div className={styles.order_container}>
          {orders?.map((order) => {
            <Order order={order} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
