import React, { useState } from 'react'
import styles from './Register.module.css'
import { Form, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';


export default function Register() {
  // function validate(values){
  //   const errors={};
  //   if(!values.name){
  //     errors.name="Name is Required";
  //   }else if(values.name.length<3){
  //     errors.name="Name should have 3 charecters";
  //   }

  //   if (!values.email) {
  //     errors.email = 'Email is Required';
  //   } else if (
  // /*    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)*/
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = 'Password is Required';
  //   } else if (
  //  /*   !/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)*/
  //   ) {
  //     errors.password = 'Invalid password';
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'rePassword is Required';
  //   } else if (values.password!==values.rePassword ) {
  //     errors.rePassword = 'Password not matched';
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'Phone is Required';
  //   } else if (
  //   /*!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)*/
  //   ) {
  //     errors.phone = 'Invalid phone number';
  //   }



  //   return errors
  // }
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    name: Yup.string().required("Name is Required ").min(3, "Name should have 3 charecters").max(10, "Name should have max 10 charecters"),
    email: Yup.string().required("Email is Required ").email("Invalid email address"),
    password: Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
    rePassword: Yup.string().required("rePassword is Required").oneOf([Yup.ref("password")], "Password not matched"),
    phone: Yup.string().required("Phone is Required").matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number"),
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
      console.log("hiiiiiiiii", values);

    }
  })
  async function registerForm(values) {
    setIsLoading(true);
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data) => {
      console.log(data.data.message);
      setUserMessage(data.data.message);
      setIsLoading(false)
      navigate("/login");
    }).catch((err) => {
      setIsLoading(false)
      console.log(err.response.data.message);
      setUserError(err.response.data.message);
    })


  }

  return (
    <>
      <div className="container  mx-auto">
        <h1 className='text-[#0aad0a] text-2xl'>Register Now</h1>
        {userError ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {userError}
        </div> : null}
        {userMessage ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div> : null}
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
            <input name='name' type="text" id="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.name && formik.errors.name ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
            <input name='email' type="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.email && formik.errors.email ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="password" autocomplete="on" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
            <input name='password' type="password" id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.password && formik.errors.password ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword :</label>
            <input name='rePassword' type="password" id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}
          </div>) : null}
          <div className='my-2'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone :</label>
            <input name='phone' type="tel" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.touched.phone && formik.errors.phone ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone} </div>) : null}
          <div className='text-end mb-20'>
            {isLoading ? <button type='submit' className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> <i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='border my-4 text-white  bg-[#0aad0a] hover:bg-[#0aa2ad]  py-2 px-3 rounded-lg'> Register</button>}


          </div>
        </form>
       
      </div>
    </>
  )
}
