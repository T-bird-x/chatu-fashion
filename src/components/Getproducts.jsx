import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Getproduct() {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [products, setProducts] = useState([])
  const img_url ="http://chatutreever.alwaysdata.net/static/images/"
  const navigate = useNavigate ()

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
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Getproduct