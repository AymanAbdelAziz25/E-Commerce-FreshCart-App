import React, { useContext, useEffect, useState } from 'react'
import styles from './WishList.module.css'
import Loader from '../Loader/Loader'
import { WishListContext } from '../Context/WishListContext.jsx';
import { CartContext } from '../Context/CartContext.jsx';

export default function WishList() {
  const [wishListItems, setWishListItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let { getWishListProducts, deleteProduct, noOfWishListItem } = useContext(WishListContext)

  async function getWishList() {
    let response = await getWishListProducts()
    setIsLoading(false)
    console.log(response, "Wish List page");
    setWishListItems(response.data.data)
  }
  async function removeProduct(productId) {

    let response = await deleteProduct(productId)
   

    setWishListItems(response.data.data)
    setIsLoading(true)
    getWishList()

  }
  useEffect(() => {
    getWishList()
  }, [])

  let { addProductToCart } = useContext(CartContext)

  async function addToCart(productId) {
    let response = await addProductToCart(productId)
    removeProduct(productId)
    setIsLoading(true)
    getWishList()
    return response


  }

  return (
    <>
      {isLoading ? <Loader /> :
        <>
          {noOfWishListItem > 0 ?
            <>
              <div className="relative container  mb-36 mx-auto mt-20  overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-main font-extrabold border bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th colSpan="2" scope="col" className="text-center px-6 py-3">
                        Action
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {wishListItems.map((item) => <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img src={item?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item?.title.split(" ").splice(0, 4).join(" ")}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {item?.price} EGP
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <a onClick={() => addToCart(item?.id)} className=" text-green-500 font-extrabold dark:text-red-500 cursor-pointer hover:text-green-900">Add to Cart</a>
                      </td>
                      <td className="px-6 py-4">
                        <a onClick={() => removeProduct(item?.id)} className=" text-red-600 font-extrabold dark:text-red-500 cursor-pointer hover:text-red-900">Remove</a>
                      </td>
                    </tr>)}

                  </tbody>
                </table>
              </div>
            </>
            :
            <div className='container mx-auto my-60 p-20'>
              <h2 className='text-main text-center text-5xl font-extrabold'>Your Wish List is Empty</h2>
            </div>
          }


        </>}





    </>
  )
}
