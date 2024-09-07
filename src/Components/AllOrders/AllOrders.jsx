import React, { useContext, useEffect } from 'react'
import styles from './AllOrders.module.css'
import { CartContext } from '../Context/CartContext';

export default function AllOrders() {
  let {clearCart}=useContext(CartContext)
async function emptyCart(){
  await clearCart()
}
  useEffect(() => {
    emptyCart()
    setTimeout(() => {
      window.location.href = '/home'; 
     }, 2510);
  }, [])

  return (
    <>
    <div className='container  mx-auto my-60 p-20'>
              <h2 className='text-main text-center text-5xl font-extrabold'>Congratulations</h2>
            </div>
    </>
  )
}
