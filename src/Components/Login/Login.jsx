import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { Form, useNavigate , Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../Context/TokenContext';



export default function Login() {
  let {token,setToken} =useContext(TokenContext)
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required("Email is Required ").email("Invalid email address"),
    password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
      console.log("hiiiiiiiii", values);

    }
  })
  async function loginForm(values) {
    setIsLoading(true);
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      console.log(data.data.message );
      console.log(data.data.user,38);
      setUserMessage(data.data.message);
      setToken(data.data.token);
      localStorage.setItem("userToken",data.data.token)
      localStorage.setItem("userName",data.data.user.name)
      localStorage.setItem("userEmail",data.data.user.email)
      // localStorage.setItem("userMobile",data.data.user.mobile)
      setIsLoading(false)
      navigate("/");
    }).catch((err) => {
      setIsLoading(false)
      console.log(err.response.data.message);
      setUserError(err.response.data.message);
    })


  }

  return (
    <>
      <div className="container  mx-auto mb-60">
        <h1 className='text-[#0aad0a] text-2xl'>Login Now</h1>
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
            <label htmlFor="password" autoComplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
            <input name='password' type="password" id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.password && formik.errors.password ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>) : null}

          <div className='text-end'>
            {isLoading ? <button type='submit' className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> <i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='border my-4  text-white  bg-[rgb(10,173,10)] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'>Login</button>}
          </div>
        </form>
        <p className='text-center text-sm text-main hover:text-green-700 font-extrabold my-3'>if you forgot your password please <Link to="/ForgotPassword" className='text-blue-600'>click here</Link> to reset it</p>
        <p className='text-center text-sm text-main hover:text-green-700 font-extrabold my-3'>if you don't have an account please <Link to="/Register" className='text-blue-600'>click here</Link> to sign up</p>
       
      </div>
    </>
  )

}



