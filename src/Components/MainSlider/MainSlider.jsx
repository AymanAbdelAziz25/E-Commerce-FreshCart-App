import React from 'react'
import styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from './../../assets/slider-image-1.jpeg'
import slider2 from './../../assets/slider-image-2.jpeg'
import slider3 from './../../assets/slider-image-3.jpeg'
import slider4 from './../../assets/grocery-banner.png'
import slider5 from './../../assets/grocery-banner-2.jpeg'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <>
      <div className="container my-16 mx-auto">
        <div className="flex">
          <div className='w-3/4'>
            <Slider {...settings}>
            <img src={slider1}  className='h-80 w-full border ' alt="" />
            <img src={slider2}  className='h-80 w-full border ' alt="" />
            <img src={slider3}  className='h-80 w-full border ' alt="" />
            </Slider>
          </div>
          <div className='w-1/4'>
          <img src={slider4}  className='h-40 w-full border  ' alt="" />
          <img src={slider5}  className='h-40 w-full border  ' alt="" />
          </div>
        </div>



      </div>
    </>
  )
}
