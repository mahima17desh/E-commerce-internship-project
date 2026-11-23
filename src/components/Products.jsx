import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  // Popup states
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const componentMounted = useRef(true);
  const messageTimer = useRef(null);

  const dispatch = useDispatch();

  // Add product to cart and show popup
  const addProduct = (product) => {
    dispatch(addCart(product));

    setMessage(`${product.title} added to cart successfully!`);
    setShowMessage(true);

    // Reset timer if another product is added
    clearTimeout(messageTimer.current);

    messageTimer.current = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // Fetch products
  useEffect(() => {
    componentMounted.current = true;

    const getProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch("https://fakestoreapi.com/products/");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        if (componentMounted.current) {
          setData(products);
          setFilter(products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (componentMounted.current) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
      clearTimeout(messageTimer.current);
    };
  }, []);

  // Loading component
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  // Filter products
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);

    setFilter(updatedList);
  };

  // Display products
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>

          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>

          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>

          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>

          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={300}
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>

                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    ₹ {product.price * 100}
                  </li>
                </ul>

                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>

                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // Main return
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>

      {/* Success Popup */}
      {showMessage && (
        <div
          className="alert alert-success position-fixed top-0 end-0 m-3 shadow"
          style={{
            zIndex: 9999,
            minWidth: "300px",
            animation: "fadeIn 0.3s ease-in-out",
          }}
          role="alert"
        >
          <strong>✓ Success!</strong>
          <br />
          {message}
        </div>
      )}
    </>
  );
};

export default Products;
