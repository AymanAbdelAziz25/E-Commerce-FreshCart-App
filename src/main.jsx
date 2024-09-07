import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'flowbite/dist/flowbite.js'
import './index.css'
import { CounterContextProvider } from './Components/Context/CounterContext.jsx'
import TokenContextProvider from './Components/Context/TokenContext.jsx'
import CartContextProvider  from './Components/Context/CartContext.jsx';
import WishListContextProvider, { WishListContext } from './Components/Context/WishListContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
  <WishListContextProvider>
  <CartContextProvider>
  <CounterContextProvider>
   <React.StrictMode>
    <App />
  </React.StrictMode>
  </CounterContextProvider>
  </CartContextProvider>
  </WishListContextProvider>
  </TokenContextProvider> ,
)
