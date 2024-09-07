import React, { useState } from 'react'
import { Form, useNavigate , Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import styles from './ResetPassword.module.css'

export default function ResetPassword() {
 
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required("Email is Required ").email("Invalid email address"),
    // password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
    newPassword: Yup.string().required("Password is Required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, "Invalid password"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      resetPass(values);
      

    }
  })
  async function resetPass(values) {
    console.log(values,"33" );
    setIsLoading(true);
    return await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).then((data) => {
      console.log(data,"35" );
      setUserMessage(data.data.message);
      setIsLoading(false)
      navigate("/Login");
    }).catch((err) => {
      setIsLoading(false)
       console.log(err,"43" );
      console.log(err.response.data.message);
      setUserError(err.response.data.message);
    })


  }

  return (
    <>
    <div className="container  mx-auto mb-60">
        <h1 className='text-[#0aad0a] text-2xl'>Reset Your Password</h1>
        {userError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {userError}
        </div> : null}
        {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div> : null}
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
            <input name='email' type="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.email && formik.errors.email ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="newPassword" autoComplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
            <input name='newPassword' type="password" id="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.newPassword}
          </div>) : null}

          <div className='text-end'>
            {isLoading ? <button type='submit' className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> <i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='border my-4  text-white  bg-[rgb(10,173,10)] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'>Reset Password</button>}
          </div>
        </form>

       
      </div>
    </>
  )
}
