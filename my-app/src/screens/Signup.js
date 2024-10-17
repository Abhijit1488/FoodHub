import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const HandleEvent = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json()
        setcredentials({name: "", email: "", password: "", geolocation: ""})
        console.log(json);
        if (!json.success) {
            alert("Enter a valid credentials")
        }
    }
    const OnChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div className='container'>
                <form onSubmit={HandleEvent} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={OnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={OnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={OnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={OnChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link className='m-3 btn btn-danger' to='/login'>Already a User</Link>
                </form>
            </div>
        </>
    )
}

export default Signup
