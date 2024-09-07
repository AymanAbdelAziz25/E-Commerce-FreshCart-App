import React, { useContext, useState } from 'react'
import { Form, useNavigate , Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import styles from './ResetCode.module.css'

export default function ResetCode() {
 
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
        resetCode: Yup.string().required("resetCode is Required").matches(/^[0-9]{6}$/, "Invalid resetCode"),
  })
  let formik = useFormik({
    initialValues: {
      
      resetCode: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      verifyResetCode(values);
      

    }
  })

  async function verifyResetCode(values) {

    console.log(values,"33" );
    setIsLoading(true);
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then((data) => {
      console.log(data,"36" );
   
      setUserMessage(data.data.message);
    
      setIsLoading(false)
      navigate("/Resetpassword");
    }).catch((err) => {
      setIsLoading(false)
      console.log(err.response.data.message);
      setUserError(err.response.data.message);
    })


  }

  return (
    <>
    <div className="container  mx-auto mb-60">
        <h1 className='text-[#0aad0a] text-2xl'>Reset Code</h1>
        {userError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {userError}
        </div> : null}
        {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div> : null}
        <form onSubmit={formik.handleSubmit}>
        
          <div className='my-2'>
            <label htmlFor="resetCode" autoComplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code :</label>
            <input name='resetCode' type="text" id="resetCode" onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.resetCode && formik.errors.resetCode ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.resetCode}
          </div>) : null}

          <div className='text-end'>
            {isLoading ? <button type='submit' className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> <i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='border my-4  text-white  bg-[rgb(10,173,10)] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'>Verify Code</button>}
          </div>
        </form>
        
      </div>
    
    </>
  )
}
