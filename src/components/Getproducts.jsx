import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Getproduct() {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])
  const img_url ="http://chatutreever.alwaysdata.net/static/images/"
  const navigate = useNavigate ()

  const AddToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if product already exists
  const existing = cart.find(item => item.product_id === product.product_id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 🛒");
};

  // Function to get products from the database
  const getproducts = async () => {
    // update the loading message
    setLoading("PLease wait, We are retrieving the products...")
    // connecting axios to the flask endpoint

    try {
      //fetching the products from the database
      const response = await axios.get("http://chatutreever.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)
      console.log(response)
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  useEffect(() =>{
    getproducts()
  },[])
  return (
    <div className='row'>
      <button
        className="btn btn-outline-dark"
        onClick={() => navigate("/cart")} >
        View Cart 🛒
        </button>
        <h2 className='text-secondary '>Available products</h2>
        {loading}
        {error}
        {/* Mapping all the products to a card */}
        {products.map((product) => (
          <div className='col-md-3 justify-content-center mb-4'>
            <div className='card shadow'>
              <img src={img_url + product.product_photo} alt=""className=' products_img' />
              <div className="card-body">
                <h5>{product.product_name}</h5>
                <p>{product.product_description}</p>
                <p>{product.product_cost}</p>
                <button className='btn btn-dark mt-2 w-100' onClick={() => navigate('/makepayment',{state : {product}})}>Purchase Now</button>
                <button className="btn btn-primary mt-2 w-100" onClick={() => AddToCart(product)}> Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
         <footer className="bg-dark text-center text-light p-2g ">
        <h5>Developed by your truly Treever &copy; 2026. All rights reserved</h5>
    </footer>
    </div>
    
  )
}

export default Getproduct