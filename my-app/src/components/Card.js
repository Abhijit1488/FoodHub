import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReucer';


function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  const priceRef = useRef();
  let priceoptions = Object.keys(options);
  let data = useCart();
  const [qty,setqty] = useState(1);
  const [size,setsize] = useState("")
  const HandleCart= async ()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        // console.log("having food data");
        // console.log(food);

        break;
      }
    }
    if (food.length !== 0) {
      // if (Array.isArray(food) && food.length > 0) {
        console.log("inside food");
      if (food.size === size) {
        console.log("same size");
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        console.log("different size");
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
    console.log(data)
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() =>{
    setsize(priceRef.current.value)
  },[])
  return (
    
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "s18rem;", "maxHeight": "360px"}}>
          <img src={props.foodItem.img} className="card-img-top" style={{ "height": "210px", "objectFit":"fill" }} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <div className='container w-100'>Hello</div> */}
            <select className='m-2 bg-success rounded' onChange={(e)=> setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 bg-success rounded' ref={priceRef} onChange={(e)=> setsize(e.target.value)}>
                {priceoptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
            </select>
            <div className='d-inline h-100 fs-5'>
              Rs.{finalPrice}/-
            </div>
                      <hr></hr>
          <button className='btn btn-success justify-center ms-2 ' onClick={HandleCart}>Add to Cart</button>
          </div>
          {/* <hr></hr>
          <button className='btn btn-success justify-center ms-2 ' onClick={HandleCart}>Add to Cart</button> */}
        </div>
      </div>
    </div>

  )
}

export default Card
