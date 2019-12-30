import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { ProductContext } from "../context/products";
import { CartContext } from "../context/cart";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  // get products from context
  const { products } = useContext(ProductContext);
  // console.log(products);

  // cart context
  const { addToCart } = useContext(CartContext);

  // find specific product - id
  const product = products.find(item => item.id === parseInt(id));

  // check if products is available to show
  if (products.length === 0) {
    return <Loading />;
  } else {
    // just get url from property: image
    const {
      image: { url },
      title,
      price,
      description
    } = product;
    return (
      <section className="single-product">
        <img src={url} alt={title} className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              // add to cart
              addToCart(product);
              // navigate to Cart
              history.push("/cart");
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
};

export default ProductDetails;
