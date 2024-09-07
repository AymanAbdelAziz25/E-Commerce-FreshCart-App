import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import App from './../../assets/App Store.png'
import Google from './../../assets/Google Play.png'
import Amazon from './../../assets/amazon-pay-logo.png'
import Master from './../../assets/mastercard-logo.png'
import PayPal from './../../assets/paypal-logo.png'
import American from './../../assets/american-express-logo.png'

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1B6B55] text-sm bottom-0 left-0 right-0 w-full mx-auto  py-5 text-white rounded-sm shadow  ">
        <div className="container text-sm mx-auto">
          <div className='my-2'>
            <h2 className='font-semibold'>Get The FreshCart App</h2>
            <p>We will send you a link, open it on your phone to download the App </p>
          </div>
          <div className='flex flex-wrap my-2'>
            <div className='w-5/6'>
              <input name='email' type="email" id="email" placeholder='Enter Your Email ...' className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='w-1/6'>
              <button className='border bg-green-300 text-black  rounded-lg mx-3 hover:bg-green-400 py-2 px-3 '>Share App Link</button>
            </div>
          </div>
          <div className='flex flex-wrap py-3 border  border-e-0 border-s-0 my-2'>
            <div className='w-1/2 flex flex-wrap '>
              <p>Payment Partners</p>
              <img src={Amazon} className='w-16 h-5 mx-2' alt="Amazon pay" />
              <img src={Master} className='w-16 h-5 mx-2' alt="Master Card" />
              <img src={PayPal} className='w-16 h-5 mx-2' alt="PayPal" />
              <img src={American} className='w-16 h-5 mx-2' alt="American" />
            </div>
            <div className='w-1/2 flex flex-wrap'>
              <p className='mx-2'>Get deliveries with FreshCart</p>
              <Link to="https://www.apple.com/store" target="_blank" className='mx-2'>
                <img src={App} className='w-28' alt="App Store" />
              </Link>
              <Link to="https://play.google.com/store" target="_blank" className='mx-2' >
                <img src={Google} className='w-28' alt="Google Play" />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap text-sm mt-2">
            <p className='w-full text-center' >© Copyright <span className="font-bold">FreshCart</span> 2024. All Rights Reserved. Designed by <span className="font-bold italic">Ayman Abdel Aziz</span> </p>
          </div>
        </div>
      </footer>

    </>
  )
}
