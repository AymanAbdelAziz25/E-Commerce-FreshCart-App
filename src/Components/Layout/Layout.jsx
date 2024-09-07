import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import WelcomeIntro from '../WelcomeIntro/WelcomeIntro'


export default function Layout() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (hasSeenIntro) {
      setTimeout(() => {
        setShowIntro(false)
      }, 1000);

    } else {
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  })

  return (
    <>
      {showIntro ? <WelcomeIntro /> :
        <>
          <Navbar />

          <Outlet />

          <Footer />
        </>
      }


    </>
  )
}
