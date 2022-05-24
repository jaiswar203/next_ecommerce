import React from 'react'
import Link from 'next/link'

import { AiOutlineShopping } from "react-icons/ai"
import { useStateContext } from '../context/stateContext'

import { Cart } from './'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  
  return (
    <div className='navbar-container'>
      <p>
        <Link href={"/"}>RedFluk HeadPhones</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart &&
        <Cart />}
    </div>
  )
}

export default Navbar