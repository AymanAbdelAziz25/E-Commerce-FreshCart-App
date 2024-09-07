import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'


export default function ProductDetails() {
  let { id, category } = useParams()

  const [productDetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data) => {
      console.log(data?.data.data);
      setProductDetails(data.data.data)
      setIsLoading(false)
    }).catch((error) => {
      console.log(error);
      setIsLoading(false)

    })
  }

  async function getRelatedProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`).then((data) => {
      console.log(data?.data.data, "related");
      let relatedProducts = data?.data.data
      relatedProducts = relatedProducts.filter((product) => product.category.name == category)
      console.log(relatedProducts);
      setRelatedProducts(relatedProducts)



    }).catch((error) => {


    })
  }

  

  let { addProductToCart } = useContext(CartContext)

  async function addToCart(productId) {
    let response = await addProductToCart(productId)
    console.log(response);
    return response
  }
  const [isWishListed, setIsWishListed] = useState(false)
  let { addProductToWishList,wishListItems } = useContext(WishListContext)
  
  async function addToWishList(productId) {
    let response = await addProductToWishList(productId)
    console.log(response);
    return response
  }

  async function checkWishListed(productId){
  console.log(wishListItems,isWishListed,productId);
  wishListItems.id?.map((id)=> {if(productId==id){return setIsWishListed(true)}})
  console.log(wishListItems,isWishListed);
  }

useEffect(() => {
  getProductDetails()
  getRelatedProducts()
  checkWishListed(id)
  
}, [])

useEffect(() => {
  getProductDetails()
  checkWishListed(id)
  window.scrollTo(0, 0)
}, [id])


  // function getProductDetails() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  // }
  // let { data, isLoading, error, isError } = useQuery({
  //   queryKey: ["productDetails"],
  //   queryFn: getProductDetails,
  //   refetchInterval:10
  // })
  // console.log(data?.data.data);



  return (
    <>
      <div className="container  mx-auto mt-20">
        {errorMessage ? <p>hi</p> : null}
        {isLoading ? <Loader /> :
          <div className="flex">
            <div className='w-1/4   px-5'>
              <Slider {...settings}>
                {productDetails.images.map((pic) => <img src={pic} key={productDetails.id} className='w-fit border border-[#0aad0a] ' alt="" />)}
              </Slider>

              {console.log(productDetails, "102")}
            </div>
            <div className='w-3/4 py-10  px-5'>
              <h1 className='text-black text-xl font-semibold mb-5'>{productDetails.title}</h1>
              <h3 className='text-gray-600 text-sm mb-5'>{productDetails.description}</h3>
              <p className='text-main text-sm mb-5'><span className='pe-10'>{productDetails.brand?.name}</span> {productDetails.category?.name}</p>
              <div className='flex justify-between items-center'>
                {productDetails.priceAfterDiscount>0?
                <>
                <p className='line-through'>{productDetails.price} EGP</p>
                <p >{productDetails.priceAfterDiscount} EGP</p>
                </>
                :
                <>
                <p>{productDetails.price} EGP</p>
                </>}
                <div className='w-1/2'>
                 <i  onClick={() => {addToWishList(productDetails.id) 
                    checkWishListed(productDetails.id) } }
                   className={`fa-heart text-green-500 mx-40 cursor-pointer text-2xl ${isWishListed?'fa-solid':'fa-regular'}`}>
                   </i>
                </div>
                <div> <i className='fa fa-star text-yellow-300'></i> {productDetails.ratingsAverage}</div>
              </div>
              <div>
                <button onClick={() => addToCart(productDetails.id)} className='bg-main w-full btn border rounded-xl px-3 py-1 my-3 text-white '>Add to Cart</button>
              </div>
            <p className='text-sm w-full'><span className='text-main pe-2'>{productDetails.sold}</span>people have already enjoyed trying this product. Hurry and buy now as we only have<span className='text-main px-2'>{productDetails.quantity}</span>  
             pieces left now.</p>
            </div>

          </div>
        }

      </div>

      <div className="container mx-auto my-20">
        <h2 className='text-main text-xl font-bold'>Related Products : </h2>
        {isLoading ? <Loader /> : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 m-10'>
          {relatedProducts.map((product) =>
            <div key={product.id} className='text-center'>
              <div className="product">
                <Link to={`/productdetails/${product.category.name}/${product.id}`}>
                  <img src={product.imageCover} className='w-full' alt="" />
                  <h4 className='text-main'>{product.category.name}</h4>
                  <p>{product.title.split(" ").splice(0, 2).join(" ")}</p>
                  <div className='flex justify-center items-center'>

                    <div className='w-1/2'> <i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</div>
                  </div>
                </Link>

              </div>

            </div>
          )}

        </div>}


      </div>
    </>
  )
}
