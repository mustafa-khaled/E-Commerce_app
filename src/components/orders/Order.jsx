import moment from "moment";

const Order = ({ order }) => {
  return (
    <div>
      <h2> Order</h2>
      <p>{moment.unix(order.data.created).format("MMM DD YYYY h:mma")}</p>
      <p>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((product) => {
        <h1>{product.title}</h1>;
      })}
      <p>{order.data.amount * 100}</p>
    </div>
  );
};

export default Order;
