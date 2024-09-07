import React from 'react'
import styles from './WelcomeIntro.module.css'
import Logo from './../../assets/Freshcart Logo.svg'

export default function WelcomeIntro() {
  return (
    <>
      <div className='flex flex-col mt-24 justify-center items-center h-96'>
        <img src={Logo} className="w-96 " alt="E-Commerce Logo" />
        <h1 className='text-main italic text-3xl font-black  '>Best Store for Shopping</h1>
      </div>
    </>
  )
}
