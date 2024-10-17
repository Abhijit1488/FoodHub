import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/cart';
import { useCart } from './ContextReucer';

export default function Navbar() {
  let data = useCart();
  const [cartview, setcartview] = useState(false);
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FoodHub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              {(localStorage.getItem('authToken')) ?
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                : ""}
            </div>
            {(!localStorage.getItem('authToken')) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/Signup">Signup</Link>
              </div>
              : <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setcartview(true)}}>
                  {/* <Link to="/cart">My Cart{" "}</Link> */}
                  My Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartview? <Modal onClose={()=>{setcartview(false)}}><Cart/></Modal>:null}
                <div className='btn bg-white text-danger mx-2' onClick={HandleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
