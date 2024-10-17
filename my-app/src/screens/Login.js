import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const HandleEvent = async (e) => {
    
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    setcredentials({ name: "", email: "", password: "", geolocation: "" })
    console.log(json);
    if (!json.success) {
      alert("Enter a valid credentials")
    }else{
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
  }
  const OnChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <>
      <div className='container bg-dark text-success mt-10' style={{"margin-top":"50px"}}>
        <form onSubmit={HandleEvent} >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={OnChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={OnChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link className='m-3 btn btn-danger' to='/signup'>New User</Link>
        </form>
      </div>
    </>
  )
}
