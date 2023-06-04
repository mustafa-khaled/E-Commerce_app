import React, { useEffect } from "react";
import Product from "../product/Product";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products-slice";

const AllProducts = () => {
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
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

export default AllProducts;
