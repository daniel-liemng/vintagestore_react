import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = createContext();

// Provider & Consumer & useContext()

export default function ProductProvider({ children }) {
  // useState
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  // useEffect
  useEffect(() => {
    // set Loading first
    setLoading(true);
    // get products data
    axios.get(`${url}/products`).then(res => {
      // an array of featured products
      // const featured = featuredProducts(res.data);
      const featured = featuredProducts(flattenProducts(res.data));
      // flatten products
      const products = flattenProducts(res.data);
      // set main products
      setProducts(products);
      // set featured products
      setFeatured(featured);
      // Loading done after getting products
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
}
