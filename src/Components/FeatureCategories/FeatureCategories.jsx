import React, { useState, useEffect } from 'react'
import styles from './FeatureCategories.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'

export default function FeatureCategories() {
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState(null)
  const [subCategoryName, setSubCategoryName] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data) => {
      // console.log(data.data.data , "Cat");
      setCategory(data.data.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err);
      setIsLoading(false)

    })
  }

  async function getSubCategories(CatId) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/subcategories/").then((data) => {
      console.log(data?.data.data,"25252525");
      setSubCategory(data?.data.data)
      console.log(subCategory);
      subCategory.map((subCat) => {if(subCat.category == CatId)
      {
        setSubCategoryName(subCat.name)
      }
      })
      console.log(subCategoryName,"subCat");
      setIsLoading(false)
    }).catch((err) => {
      console.log(err);
      console.log(subCategory,"subCat");
      setIsLoading(false)

    })
  }

  useEffect(() => { getCategories() }, [])


  return (
    <>
      {console.log(category, "23")}
      <div className="container  mx-auto mb-20">
        {isLoading ? <Loader /> :
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5  gap-y-16 mt-60 md:mt-32 lg:mt-20 m-10'>
            {category.map((category) =>
              <div key={category._id} 
              onClick={()=> getSubCategories(category._id)}
              className='text-center cursor-pointer'>
                <div className="product">
                  <img src={category.image} className='w-full h-48' alt="" />
                  <h4 className='text-main my-3'>{category.name}</h4>

                </div>

              </div>
            )}

          </div>}
          {console.log(subCategoryName, "666666666666666")}
          {isLoading ? <Loader /> :
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5  gap-y-16 mt-60 md:mt-32 lg:mt-20 m-10'>
            
              <div  className='text-center'>
                <button className='px-3 py-2 border border-green-500 text-main'>
                {subCategoryName}
                </button>
              </div>
            

          </div>}


      </div>
    </>
  )
}
