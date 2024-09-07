import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext()

export default function WishListContextProvider(props) {
    const [noOfWishListItem, setNoOfWishListItem] = useState(0)
    const [wishListItems, setWishListItems] = useState({})
    
    let headers = {
        token: localStorage.getItem("userToken")
    }

    async function addProductToWishList(productId) {
       
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
            productId
        }, {
            headers
        }).then((response) => {
            console.log(response,"WishList ");
            toast.success(response.data.message)
            setNoOfWishListItem(response?.data?.data?.length)
            setWishListItems(response?.data?.data)
            console.log(wishListItems);
            
            return response
        }).catch((error) => {
            console.log(error ,"wishList");
            return error
        })
    }

    async function getWishListProducts() {
        
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers
        }).then((response) => {
            // console.log(response);
            setNoOfWishListItem(response?.data?.data?.length)
            setWishListItems(response?.data?.data)
            console.log(wishListItems);
           
            return response


        }).catch((error) => {
            console.log(error);
            return error

        })
    }

    async function deleteProduct(productId) {
        
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((response) => {
            // console.log(response);
            setNoOfWishListItem(response?.data?.data?.length)
            setWishListItems(response?.data?.data)
            console.log(wishListItems);
            
            return response
        }).catch((error) => {
            console.log(error);
            return error
        })
    }

 

    return <WishListContext.Provider value={{ addProductToWishList,getWishListProducts,deleteProduct,noOfWishListItem,wishListItems }} >{props.children}</WishListContext.Provider>

}