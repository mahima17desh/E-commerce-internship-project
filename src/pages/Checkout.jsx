import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart) || [];
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle checkout
  const handleCheckout = (e) => {
    e.preventDefault();

    setOrderPlaced(true);
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * 100 * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          {/* Order Summary */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>

              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>₹{shipping}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <strong>Total amount</strong>
                    <strong>₹{Math.round(subtotal + shipping)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing Address</h4>
              </div>

              <div className="card-body">
                {orderPlaced ? (
                  <div className="alert alert-success text-center p-4">
                    <h3>✓ Order Placed Successfully!</h3>
                    <p className="mb-3">
                      Thank you for shopping with us. Your order has been
                      submitted successfully.
                    </p>
                    <Link to="/" className="btn btn-dark">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleCheckout}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First name"
                          required
                        />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last name"
                          required
                        />
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="House number, street name"
                          required
                        />
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address2" className="form-label">
                          Address 2 (Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select className="form-select" id="country" required>
                          <option value="">Choose...</option>
                          <option value="India">India</option>
                        </select>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select className="form-select" id="state" required>
                          <option value="">Choose...</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="New Delhi">New Delhi</option>
                        </select>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder="PIN code"
                          required
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment Details</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder="Full name"
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">
                          Credit Card Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          placeholder="Card number"
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder="MM/YY"
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="cc-cvv"
                          placeholder="CVV"
                          required
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Checkout Button */}
                    <button
                      className="w-100 btn btn-primary btn-lg"
                      type="submit"
                    >
                      Continue to Checkout
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />

        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
