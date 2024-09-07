import React, { useContext, useEffect } from 'react'
import Logo from './../../assets/Freshcart Logo.svg'
import Cart from './../../assets/cart.png'
import './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { TokenContext } from '../Context/TokenContext'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'


export default function Navbar() {
  let { token, setToken } = useContext(TokenContext)
  let{noOfCartItem,getCartProducts}=useContext(CartContext)
  let{noOfWishListItem}=useContext(WishListContext)
  let navigate = useNavigate();
  
 
  

  

  function getCart() {

    getCartProducts()
        
  }
  useEffect(() => {
    getCart()
    
  }, [])



  function logOut() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }
  let userName = localStorage.getItem("userName")

  return (
    <>



      <nav className="bg-[#D0E7D2] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="E-Commerce Logo" />

          </Link>


          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ?
                <>
                 
                  
                 
                  <li>
                    <Link to="Wishlist" className="block py-2 px-3 relative text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      <i  className='fa-solid fa-heart cursor-pointer text-main text-2xl'></i>
                      <span className="bg-main absolute -top-2 right-11 md:-top-4 md:-right-1 text-white text-xs font-medium mx-0.5 p-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      {noOfWishListItem}
                      </span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="Cart" className="block py-2 px-3 relative text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      <img src={Cart} className="h-8 cartLogo" alt="E-Commerce Logo" />
                      <span className="bg-main absolute -top-2 right-10 md:-top-4 md:right-0.5 text-white text-xs font-medium mx-0.5 p-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      {noOfCartItem}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="UserAccount" className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"> {userName}</Link>
                  </li>

                  <li>
                    <a href="#" onClick={() => logOut()} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">LogOut</a>
                  </li>
                </>
                :
                <>
                  <li>
                    <NavLink to="Login" className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="Register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</NavLink>
                  </li>
                </>}
            </ul>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            {token ? <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="Home" className="block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:text-black md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to="Cart" className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Cart 
                  {/* <span className="bg-main absolute -top-3 -right-5 text-white text-xs font-medium mx-0.5 p-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {noOfCartItem}
                  </span> */}
                </NavLink>
              </li>
              <li>
                <NavLink to="WishList" className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Wish List 
                  {/* <span className="bg-main absolute -top-3 -right-5 text-white text-xs font-medium mx-0.5 p-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {noOfWishListItem}
                  </span> */}
                </NavLink>
              </li>
              <li>
                <NavLink to="Products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
              </li>
              <li>
                <NavLink to="Categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a]  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
              </li>
              <li>
                <NavLink to="Brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:font-semibold md:hover:text-[#0aad0a]  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
              </li>
            </ul>
              :
              null
            }

          </div>
        </div>
      </nav>

    </>
  )
}
