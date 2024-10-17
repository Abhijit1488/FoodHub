import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'

export default function Home() {

  const [search, setsearch] = useState('');
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setfooditem(response[0]);
    setfoodcat(response[1]);
    // console.log(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])




  return (
    <div >
      <Navbar />
      <div>
        {/* <Carousal /> */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ "zIndex": "10" }}>
              <div className="d-flex justify-content-center"> 
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}
                  onChange={(e) => { setsearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success"  type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://wallpapercave.com/wp/wp10322996.jpg" className="d-block w-100" style={{ "filter": "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" className="d-block w-100" style={{ "filter": "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://wallpapercave.com/wp/wp8465834.jpg" className="d-block w-100" style={{ "filter": "brightness(40%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          // foodcat !== []
          // ? foodcat.map((data) =>{
          //   return(
          //     <div>{data.CategoryName}</div>
          //   )
          // }):"" 
          Array.isArray(foodcat) && foodcat.length > 0
            ? foodcat.map((data, index) => {
              return (
                <div className='row m-3'>
                  <div key={index} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />{
                    Array.isArray(fooditem) && fooditem.length > 0
                      ? (
                        // Replace this with the actual rendering logic for fooditem
                        fooditem.filter((cat) => (cat.CategoryName === data.CategoryName) && (cat.name.toLowerCase().includes(search.toLowerCase()))).map((item, idx) => (
                          <div key={idx} className='col-12 col-md-6 col-lg-3'>
                            {/* Assuming there's a name property */}
                            {/* {item.name} */}
                            <Card
                              foodItem={item}
                              options={item.options[0]}
                            />
                          </div>
                        ))
                      )
                      : "No data"
                  }
                </div>

              )
            })
            : <div>No categories available</div>
        }
      </div>
      <Footer />
    </div>
  )
}
