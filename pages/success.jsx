import React,{useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from "react-icons/bs"

import { useStateContext } from '../context/stateContext'
import { Pride } from '../utils/confetti'

const Success = () => {
  const {setCartItems,setTotalPrice,setTotalQuantities}=useStateContext()
  
  useEffect(()=>{
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    Pride()
  },[])
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check Your Email Inbox for receipt</p>
        <p className="description"> 
          If you have any question ,email us on 
          <a href="maito:info@redfluk.com" className="email">
             info@redfluk.com
          </a>
        </p>
        <Link href={"/"}>
          <button type='button' width="300px" className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success