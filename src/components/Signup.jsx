import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const[username, SetUsername] = useState ("")
  const[email, SetEmail] =useState ("")
  const[tel, SetTel] = useState("")
  const[password,SetPassword] =useState("")
  const[loading ,SetLoading] = useState("")
  const[success,SetSuccess] =useState("")
  const[error, SetError] =useState("")

  const submit = async (e) => {
    e.preventDefault()
    SetLoading("Wait as we sign you in")

    try {
      const data = new FormData ()
      data.append('username',username)
      data.append('email' ,email)
      data.append('phone',tel)
      data.append('password',password)

      const response = await axios.post('http://chatutreever.alwaysdata.net/api/signup',data)
      SetLoading("")
      SetLoading(response.data.success)

      SetUsername("")
      SetEmail("")
      SetTel("")
      SetPassword("")


    } catch (error) {
      SetLoading("")
      SetLoading(error.message)
      
    }
  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-6 p-4 card shadow' >
        <form onSubmit={submit}>
          {loading}
          {error}
          {success}
          <h1>Sign Up</h1>
          <input type="text" placeholder= 'Enter Your Username' className="form-control" value={username} onChange={(e) => SetUsername(e.target.value)} required/><br/> <br />
          <input type="email" placeholder='Enter Your Email' className="form-control" value={email} onChange={(e) => SetEmail(e.target.value)} required/> <br /> <br />
          <input type="tel" placeholder='Enter Your Phone Number' className="form-control" value={tel} onChange={(e) => SetTel(e.target.value)} required/> <br /> <br />
          <input type="password" placeholder='Enter Your Password' className="form-control" value={password} onChange={(e) => SetPassword(e.target.value)} required/> <br /> <br />
          <button type='submit' className='btn btn-success w-100'>SignUp</button>
          <p>Already have an account? <Link to= '/signin'>Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup