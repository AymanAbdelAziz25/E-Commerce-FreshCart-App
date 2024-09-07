import React from 'react'
import styles from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import BackToTop from '../BackToTop/BackToTop'

export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>
    
    </>
  )
}
