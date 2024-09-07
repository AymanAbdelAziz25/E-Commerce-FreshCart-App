import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import Loader from '../Loader/Loader'
import { CartContext } from '../Context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from "flowbite-react";

export default function Cart() {

  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let { getCartProducts, deleteProduct, updateCartItem, clearCart, noOfCartItem, totalPrice } = useContext(CartContext)

  async function getCart() {

    let response = await getCartProducts()
    setIsLoading(false)
    // console.log(response.data.data.products, "cart data");
    setCartItems(response.data.data.products)

  }

  async function removeProduct(productId) {

    let response = await deleteProduct(productId)
    // console.log(response, "delete product");
    setCartItems(response.data.data.products)

  }

  async function updateProduct(productId, count) {

    let response = await updateCartItem(productId, count)
    console.log(response, "update product");
    setCartItems(response.data.data.products)

  }

  async function removeCart() {

    let response = await clearCart()
    // console.log(response, "delete product");
    setCartItems([])

  }


  useEffect(() => {
    getCart()

  }, [])






  return (
    <>
      {isLoading ? <Loader /> :
        <>
          {noOfCartItem > 0 ?
            <>
              <div className="relative container  mb-30  mx-auto mt-20 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-main font-extrabold border bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(cartItems,"90")} 
                    {cartItems.map((item) =>
                      <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img src={item?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item?.product?.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button onClick={() => updateProduct(item?.product?.id, item?.count - 1 <= 0 ? removeProduct(item?.product?.id) : item?.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>
                            </button>
                            <div>
                              <span>{item?.count}</span>
                            </div>
                            <button onClick={() => updateProduct(item?.product?.id, item?.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item?.price} EGP
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item?.price * item?.count} EGP
                        </td>
                        <td className="px-6 py-4">
                          <a onClick={() => removeProduct(item?.product?.id)} className=" text-red-600 font-extrabold dark:text-red-500 cursor-pointer hover:text-red-900">Remove</a>
                        </td>
                      </tr>)}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className='p-5 font-extrabold text-right text-black text-2xl' colSpan="5" >Total Price</td>
                      <td className='p-5 font-extrabold text-right text-black text-2xl' colSpan="5" >{totalPrice}</td>

                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=' flex justify-center items-center text-center mt-6 mb-20'>
                
                  <Dropdown label="CheckOut"  dismissOnClick={false}>
                    <Link to="/checkout" state={{type:"Cash Payment"}} className='font-extrabold'>
                    <Dropdown.Item><i className="fa-solid fa-sack-dollar px-2"></i> Cash</Dropdown.Item>
                    </Link>
                    <Link to="/checkout" state={{type:"OnLine Payment"}} className='font-extrabold'>
                    <Dropdown.Item><i className="fa-regular fa-credit-card px-2"></i>Visa </Dropdown.Item>
                    </Link>
                  </Dropdown>
                
                <button onClick={() => removeCart()} className='bg-red-600 hover:bg-red-900  text-white mx-2   p-2 rounded-lg'>
                  Clear Cart
                </button>
                
              </div>
            </>
            : <div className='container mx-auto my-60 p-20'>
              <h2 className='text-main text-center text-5xl font-extrabold'>Your Cart is Empty</h2>
            </div>
          }
        </>}




    </>
  )
}
