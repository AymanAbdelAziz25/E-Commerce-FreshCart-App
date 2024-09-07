import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export let CartContext = createContext()

export default function CartContextProvider(props) {
    const [noOfCartItem, setNoOfCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartId, setCartId] = useState(null)
    
    let headers = {
        token: localStorage.getItem("userToken")
    }

    async function addProductToCart(productId) {


        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, {
            headers
        }).then((response) => {
            // console.log(response.data.message);
            toast.success(response.data.message)
            setNoOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            setCartId(response.data.data._id)
            console.log(cartId,"cartId add");
            
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function getCartProducts() {



        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers
        }).then((response) => {
            //console.log(response,"get cart");
            setNoOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            setCartId(response.data.data._id)
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function deleteProduct(productId) {



        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        }).then((response) => {
            // console.log(response);
            setNoOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            setCartId(response.data.data._id)
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function updateCartItem(productId, count) {



        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers
        }).then((response) => {
            // console.log(response);
            setTotalPrice(response.data.data.totalCartPrice)
            setCartId(response.data.data._id)
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function clearCart() {



        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers
        }).then((response) => {
            // console.log(response);
            setTotalPrice(0)
            setNoOfCartItem(0)
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function cashPayment(shippingAddress) {



        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
            shippingAddress
        }, 
        {
            headers
        }).then((response) => {
            console.log(response, "Cash Payment");
            window.location.href="/allorders"


            return response


        }).catch((error) => {
            console.log(error);
            console.log(shippingAddress,"shippingAddress");
            console.log(headers,"headers");
            console.log(cartId,"cartId");
            
            return error

        })
    }

    async function onlinePayment(shippingAddress) { 



        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-fresh-cart-app.vercel.app`,{
            shippingAddress
        }, 
        {
            headers
        }).then((response) => {
            console.log(response, "Online Payment");
            window.location.href=response.data.session.url
            return response


        }).catch((error) => {
            console.log(error);
            console.log(shippingAddress,"shippingAddress");
            console.log(headers,"headers");
            console.log(cartId,"cartId");
            return error

        })
    }

    return <CartContext.Provider value={{ addProductToCart, totalPrice, noOfCartItem, updateCartItem, getCartProducts, deleteProduct, clearCart, onlinePayment,cashPayment }} >{props.children}</CartContext.Provider>

}
