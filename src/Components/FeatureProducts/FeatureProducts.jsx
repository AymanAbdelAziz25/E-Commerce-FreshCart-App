import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProducts.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'

export default function FeatureProducts() {
  let { addProductToCart } = useContext(CartContext)
  let { addProductToWishList, wishListItems, deleteProduct } = useContext(WishListContext)
  const [isWishListed, setIsWishListed] = useState(false)


  async function addToCart(productId) {
    let response = await addProductToCart(productId)
    console.log(response);
    return response
  }

  async function addToWishList(productId) {
    let response = await addProductToWishList(productId)
    console.log(response);
    return response
  }

   async function checkWishListed(productId) {
     console.log(wishListItems, isWishListed, productId);
    wishListItems.map((item) => {if(item.id === productId) 
      {
        
        deleteProduct(productId)
        setIsWishListed(false)
        
      }
      else
      {
        addToWishList(productId)
        setIsWishListed(true)
      }
     })
    
     console.log(wishListItems, isWishListed);
  }



  function getFeatureProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getFeatureProducts,
    // staleTime:5000,
    // retry:5,
    // retryDelay:2000,
    // refetchInterval:2000
  })

  // const [product, setProduct] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // async function getProducts() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data) => {
  //     console.log(data.data.data);
  //     setProduct(data.data.data)
  //     setIsLoading(false)
  //   }).catch((err) => {
  //     console.log(err);
  //     setIsLoading(false)

  //   })
  // }
  // useEffect(() => { getProducts() }, [])

  const [searchProduct, setSearchProduct] = useState('');

  const handleChange = (event) => {
    setSearchProduct(event.target.value);
  };
  // console.log(searchProduct,"Value");

  // data?.data.data.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  return (
    <>
      {console.log(data?.data.data, "66")}
      <div className="container  mx-auto mb-20 mt-60 md:mt-28 lg:mt-20">
        {isLoading ? <Loader /> :
          <>


            <input name='search' type="text" id="search" placeholder="Search..." onChange={handleChange} value={searchProduct} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 m-10'>
              {data?.data.data.map((product) =>
                <div key={product.id} className='text-center'>
                  <div className="product">
                    <Link to={`/productdetails/${product.category.name}/${product.id}`}>
                      <img src={product.imageCover} className='w-full' alt="" />
                      <h4 className='text-main'>{product.category.name}</h4>
                      <p>{product.title.split(" ").splice(0, 2).join(" ")}</p>
                      <p className='w-full'>{product.price} EGP</p>
                    </Link>
                    <div key={product.id} className='flex justify-between items-center'>
                      <div className='w-1/2'> <i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</div>
                      {console.log(wishListItems)}
                      {/* {wishListItems.map((item) => (
                        item.id === product.id ? 
                        <>
                         
                          <div className='w-1/2' key={item.id}>
                            <i onClick={() => addToWishList(product.id)} className='fa-solid fa-heart cursor-pointer text-main text-2xl'></i>
                          </div>
                        </>  
                         : 
                         <>
                           <div className='w-1/2' key={item.id}>
                            <i onClick={() => deleteProduct(product.id)} className='fa-regular fa-heart cursor-pointer text-main text-2xl'></i>
                          </div>
                        </>
                      ))}  */}

                      <div className='w-1/2' key={product.id}>
                        <i onClick={() => addToWishList(product.id)} className={`fa-heart cursor-pointer text-main text-2xl ${!setIsWishListed?'fa-solid':'fa-regular'}`} ></i>
                      </div>

                    </div>
                    <div>
                      <div>
                        <button onClick={() => addToCart(product.id)} className='bg-main btn border rounded-xl px-3 py-1 my-3 text-white '>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        }
      </div>
    </>
  )
}

