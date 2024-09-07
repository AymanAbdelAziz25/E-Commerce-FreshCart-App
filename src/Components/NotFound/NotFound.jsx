import React from 'react'
import errpic from './../../assets/404.svg'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
    <div className="container  mx-auto text-center">
      <img src={errpic} className='w-full' alt='Not Found Pic'/>
    </div>
    </>
  )
}
