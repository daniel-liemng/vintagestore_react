import React, { useContext } from "react";

import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";

const Products = () => {
  // console.log(useContext(ProductContext));
  const { loading, products } = useContext(ProductContext);
  // console.log(products);

  // return <div>{loading ? <Loading /> : <ProductList />}</div>;
  if (loading) {
    return <Loading />;
  }
  return <ProductList title="our products" products={products} />;
};

export default Products;
