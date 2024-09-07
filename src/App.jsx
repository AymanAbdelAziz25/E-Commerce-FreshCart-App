import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import './App.css'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import WishList from './Components/WishList/WishList'
import AllOrders from './Components/AllOrders/AllOrders'
import Checkout from './Components/Checkout/Checkout'
import UserAccount from './Components/UserAccount/UserAccount'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'

export default function App() {

  const queryClient = new QueryClient()

  let routes = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "Home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "Cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: "WishList", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      { path: "Products", element: <Products /> },
      { path: "Categories", element: <ProtectedRoutes><Categories/></ProtectedRoutes> },
      { path: "Brands", element: <ProtectedRoutes><Brands/></ProtectedRoutes> },
      { path: "AllOrders", element: <ProtectedRoutes><AllOrders/></ProtectedRoutes> },
      { path: "Checkout", element: <ProtectedRoutes><Checkout/></ProtectedRoutes> },
      { path: "UserAccount", element: <ProtectedRoutes><UserAccount/></ProtectedRoutes> },
      { path: "ProductDetails/:category/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: "Login", element: <ProtectedAuth><Login /></ProtectedAuth> },
      { path: "ForgotPassword", element: <ForgotPassword /> },
      { path: "ResetCode", element: <ProtectedAuth><ResetCode /></ProtectedAuth> },
      { path: "ResetPassword", element: <ProtectedAuth><ResetPassword /></ProtectedAuth> },
      { path: "Register", element: <ProtectedAuth><Register /></ProtectedAuth> },
      { path: "*", element: <ProtectedRoutes><NotFound /></ProtectedRoutes> }
    ]
  }])

  return (
    <>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster  position="top-right" reverseOrder={false}/>
      </QueryClientProvider>

    </>
  )
}

