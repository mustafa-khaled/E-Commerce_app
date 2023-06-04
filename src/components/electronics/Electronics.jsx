import Product from "../product/Product";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../../redux/slices/category-slice";

const Electronics = () => {
  const products = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory("6439d2d167d9aa4ca970649f"));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products_container container ">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Electronics;
