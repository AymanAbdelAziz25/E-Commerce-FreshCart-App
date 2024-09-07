import React, { useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import {useFormik } from 'formik'
import { CartContext } from '../Context/CartContext';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(null)
  let {cashPayment,onlinePayment}=useContext(CartContext)
  let {state} = useLocation()
  console.log(state.type);
  
useEffect(() => {
  window.scrollTo(0, 0);
  setPaymentType(state.type)
}, [])


  let formik = useFormik({
    initialValues: {
        details : "",
        phone : "",
        city : ""
    },
    
    onSubmit: (values) => {
      
      console.log(values,"pay now");
      payOnline(values)

    }
  })
async function payOnline(values){
  if(paymentType=="OnLine Payment"){
    await onlinePayment(values)
  }else{
    await cashPayment(values)
  }
  
}

  return (
    <>
    <div className="container mx-auto mb-60 ">
      <h1 className='text-main text-center text-3xl font-extrabold'>{paymentType}</h1>
    <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details :</label>
            <input name='details' type="text" id="details" onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.details && formik.errors.details ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.details}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="phone"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone :</label>
            <input name='phone' type="tel" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.phone && formik.errors.phone ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="city"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City :</label>
            <input name='city' type="text" id="city" onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.city && formik.errors.city ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.city}
          </div>) : null}

          <div className='text-end'>
            {isLoading ? <button type='submit' className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> <i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='border my-4  text-white  bg-[rgb(10,173,10)] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'>Pay Now</button>}
          </div>
        </form>
    </div>
    
    </>
  )
}
