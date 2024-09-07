import React, { useContext } from 'react'
import styles from './UserAccount.module.css'
import { Table } from "flowbite-react"
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'
import { Link } from 'react-router-dom'

export default function UserAccount() {
  
  let userName = localStorage.getItem("userName")
  let userEmail = localStorage.getItem("userEmail")
  let{noOfCartItem}=useContext(CartContext)
  let{noOfWishListItem}=useContext(WishListContext)
  
  
  return (
    <>
    <div className="container mx-auto h-screen">
      <h1 className='text-main text-center text-3xl font-extrabold'>Account Informations </h1>
      <div className="overflow-x-auto my-5">
      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
         
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Name
            </Table.Cell>

            <Table.Cell>{userName}</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Email
            </Table.Cell>

            <Table.Cell>{userEmail}</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Mobile
              </Table.Cell>

            <Table.Cell>01234567890</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Shipping Address
              </Table.Cell>

            <Table.Cell>102 Bahr St, Building no 85 - 3rd Floor - Apartment No. 66</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              City
              </Table.Cell>

            <Table.Cell>Alexandria</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Country
              </Table.Cell>

            <Table.Cell>Egypt</Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Password
              </Table.Cell>

            <Table.Cell>
              <Link to="/forgotpassword" className='text-main hover:text-green-700'>Reset Password</Link>
            </Table.Cell>
           
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-extrabold text-main text-lg dark:text-white">
              Cart
              </Table.Cell>

            <Table.Cell><p>You currently have {noOfCartItem} products in your cart and {noOfWishListItem} more in your wish list</p> </Table.Cell>
           
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
    </div>
    </>
  )
}
