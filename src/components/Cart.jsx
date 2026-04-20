import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState([]);
  const {product} =useLocation().state || {}
  const navigate = useNavigate();
  const img_url = "http://chatutreever.alwaysdata.net/static/images/";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // remove item
  const removeItem = (id) => {
    const updated = cart.filter(item => item.product_id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // update quantity
  const updateQty = (id, qty) => {
    const updated = cart.map(item =>
      item.product_id === id
        ? { ...item, quantity: item.quantity + qty }
        : item
    ).filter(item => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // total price
  const total = cart.reduce(
    (sum, item) => sum + item.product_cost * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="card mb-3 p-3" key={item.product_id}>
              <div className="row">
                <div className="col-md-3">
                <img src={img_url + item.product_photo} alt="" className="product_img w-100" />
                </div>

                <div className="col-md-6">
                  <p >Product Name: {item.product_name}</p>
                  <p>product description: {item.product_description}</p>
                  <p>KES {item.product_cost}</p>
                  <p>Quantity: {item.quantity}</p>

                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => updateQty(item.product_id, 1)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => updateQty(item.product_id, -1)}
                  >
                    -
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h4>Total: KES {total}</h4>

          <button
            className="btn btn-dark w-100"
            onClick={() =>
              navigate("/makepayment", {state: { product: { product_cost: total }}})}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;