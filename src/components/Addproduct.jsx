import axios from 'axios'
import React, { useState } from 'react'

function Addproduct() {
  const[productname, setProductname] = useState ("")
  const[productdescription,setProductdescription] = useState ("")
  const[productcost,setProductcost] = useState ("")
  const[productphoto,setProductphoto] = useState("")
  const[loading,setLoading] = useState ("")
  const[success,setSuccess] = useState ("")
  const[Error,setError] = useState ("")


  const submit= async(e) =>{
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading("Wait as we add the Product")

    try {
      const data= new FormData()
      data.append('product_name',productname)
      data.append('product_description',productdescription)
      data.append('product_cost',productcost)
      data.append('product_photo',productphoto)

      const  response= await axios.post("https://chatutreever.alwaysdata.net/api/add_product", data)
      setLoading("")
      setSuccess(response.data.message)

      setProductcost("")
      setProductname("")
      setProductdescription("")
      setProductphoto("")


    } catch (error) {
      setLoading("")
      setSuccess("")
      setError(error.message)
      
    }

  }

  return (
    <div className='row mt-4 justify-content-center'>
        <div className='col-md-6 card shadow p-4' >
          <h2>Add Product</h2>
          <form onSubmit={submit}>
            {loading}
            {success}
            {Error}
          <input type="text" placeholder='Enter Product Name'className='form-control'value= {productname} onChange={(e) => setProductname(e.target.value)} required/><br />
         
          <textarea placeholder='productdescription' className='form-control' value= {productdescription} onChange={(e) =>setProductdescription(e.target.value)} required></textarea><br />
  
          <input type="number" placeholder='Enter cost' className='form-control' value={productcost} onChange={(e) =>setProductcost(e.target.value)} required/><br />
          
          <input type="file" placeholder='Product Photo' className='form-control' accept='image/*' onChange={(e) =>setProductphoto(e.target.files[0])} required/><br/>
          <button type='submit' className='btn btn-primary w-100'>
            Add Product
          </button>
          </form>
        </div>
    </div>
  )
}

export default Addproduct