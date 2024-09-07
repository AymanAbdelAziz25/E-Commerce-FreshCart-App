import React from 'react'
import styles from './CategorySlider.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  function getCategorySlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }


  let { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategorySlider,
  })

  // console.log(data, "CatSlider");

  return (
    <>
      <div className="container my-10 mx-auto">
        <h2 className='text-main font-bold my-3'>Show Popular Categories : </h2>
        <Slider {...settings}>
          {data?.data.data.map((cat) => <div  key={cat._id} className='text-center' >
            <img src={cat.image}  className='w-48 h-52 border mx-auto ' alt="" />
            <p className=' text-main font-sm '>{cat.name}</p>
          </div> )}
        </Slider>

        


      </div>
    </>
  )
}
