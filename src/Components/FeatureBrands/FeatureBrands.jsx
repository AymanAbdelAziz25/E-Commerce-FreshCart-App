import React, { useState, useEffect } from 'react'
import styles from './FeatureBrands.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { Button, Modal } from "flowbite-react";



export default function FeatureBrands() {
  const [openModal, setOpenModal] = useState(false);
  const [brand, setBrand] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((data) => {
      // console.log(data.data.data ,"brand");
      setBrand(data.data.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err);
      setIsLoading(false)

    })
  }
  useEffect(() => { getBrands() }, [])

  return (
    <>
      <div className="container  mx-auto mb-20">
        {isLoading ? <Loader /> :
          <>
            {console.log(brand, "All Brands")}
            <>

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-60 md:mt-32 lg:mt-20 m-10'>
                {brand.map((brand) =>
                <>
                  <Button key={brand._id} onClick={() => {
                    setOpenModal(true)
                    {localStorage.setItem("modelImg",`${brand.image}`)}
                    {localStorage.setItem("modelName",`${brand.name}`)}
                    }}>
                    <div className='text-center'>

                      <div className="product">
                        <img src={brand.image} className='w-full text-main' alt="" />
                        
                      </div>
                    </div>
                  </Button>
                  <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>All Brands</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    
                    <div>
                    <img src={localStorage.getItem("modelImg")} className='w-1/3 mx-auto text-main' alt="" />
                    
                    </div>
                    <h2 className='text-center text-3xl text-main font-extrabold'>{localStorage.getItem("modelName")}</h2>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="green" className='mx-auto' onClick={() => setOpenModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
                  
                  </>
                )}
              </div>
             
            </>
          </>
        }
      </div>
    </>
  )
}
