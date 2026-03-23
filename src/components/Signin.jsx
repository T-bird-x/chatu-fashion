import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const[loading, setLoading] = useState("")
  const[error, setError] = useState("")
  const navigate = useNavigate()

  // Function to post data to the database
  const submit = async (e) =>{
    // Prevent the default behaviour of form loading
    e.preventDefault()
    // Updating the loading message
    setLoading("Please wait as we log you in")
    // Uploading data into the database
    try {
      // Adding user input to the variable data
      const data= new FormData()
      data.append("email",email)
      data.append("password",password)

      // Posting data
      const response=await axios.post("http://chatutreever.alwaysdata.net/api/signin", data)
      // updating loading message to empty
      setLoading("")
      // Checking if a user exists
      if (response.data.user) {
        // adding the user in the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting the user to the landing page
        navigate("/")
      }
      else{
        // When the user inputs wrong email or password
        setError(response.data.message)
      }
    }
    catch (error){
      // Making the loading to empty
      setLoading("")
      // Updating the error message
      setError(error.response.data.message)
    }
  }
  return (
    <div className='row mt-4 justify-content-center'>
      <div className='col-md-6 card shadow p-4'>
        <h2>Sign In</h2>
        <form onSubmit={submit}>
          {loading}
          {error}
          <input type=" email" placeholder="Enter your Email" className="form-control" value= {email} onChange={(e) => setEmail(e.target.value)} required/><br />
          <input type="password" placeholder='Enter your password' className='form-control' value ={password} onChange={(e) =>setPassword(e.target.value)}requiredn /> <br />
          <button type='submit' className='btn btn-primary w-100'>
            Sign In
          </button><br />
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin