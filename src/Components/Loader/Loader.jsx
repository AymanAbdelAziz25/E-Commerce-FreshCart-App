import React from 'react'
import styles from './Loader.module.css'
import { Puff } from 'react-loader-spinner'

export default function Loader() {
  return (
    <>
    <div className="container h-96 flex  justify-center items-center">
      <div>
      <Puff
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    </div>
    
    </>
  )
}
