import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const [phone, setPhone] = useState("")
    const [message,setMessage] = useState("")
    const {product} =useLocation().state || {}
    const [error, setError] = useState("")
    const img_url = "http://chatutreever.alwaysdata.net/static/images/"

    // Function to make payment
    const submit = async (e) => {
        // Prevent default loading behavour
        e.preventDefault()
        // set loading message
        setMessage("PLease wait as we process")
        // Attaching user inputs to the data variable
        const data = new FormData()
        data.append("phone",phone)
        data.append("amount",product.product_cost)
        // connecting to the database
        try {
            const response = await axios.post("http://chatutreever.alwaysdata.net/api/mpesa_payment", data)
            setMessage("Please complete payment on your phone ")
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
      <h1 className='text-center'>Makepayment -Lipa na Mpesa</h1>
      <div className='row justify-content-center mt-4'>
        <div className='col-md-6 card shadow p-4'>

       {/* binding the product information to make payment page*/}
        <img src={img_url + product.product_photo} alt=""  className='product_img w-100'/>
        <p >Product Name: {product.product_name}</p>
        <p>product description: {product.product_description}</p>
        <p>Product cost: {product.product_cost}</p>
        <form onSubmit={submit}>
            {error}
            {message}
           <input type="tel"value = {phone} className= 'form-control'placeholder='Enter Your Phone Number 254xxx' onChange={(e) => setPhone(e.target.value)} /> <br /><br />
            <button type='submit' className='btn btn-danger w-100'>Make Payment</button>
        </form>
          </div>
        </div>
    </div>
  )
}

export default Makepayment