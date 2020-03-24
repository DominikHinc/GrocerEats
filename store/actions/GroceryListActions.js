export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const SETCHECKOFPRODUCT = 'SET_CHECK_OF_PRODUCT'
export const EDIT_PRODUCT_AMOUNT = "EDIT_PRODUCT_AMOUNT"
export const SET_NEW_PRODUCTS_LIST = "SET_NEW_PRODUCTS_LIST"

export const addProduct = (product)=>{
    return {
        type:ADD_PRODUCT,
        product
    }
}

export const removeProduct = (id) =>{
    return {
        type:REMOVE_PRODUCT,
        id
    }
}

export const editProduct = (product) =>{
    return {
        type:EDIT_PRODUCT,
        product
    }
}

export const setNewProductsList = (productsList) =>{
    return{
        type:SET_NEW_PRODUCTS_LIST,
        productsList
    }
}

export const editProductAmount = (id,amountMain)=>{
    return {
        type:EDIT_PRODUCT_AMOUNT,
        id,
        amountMain
    }
}

export const setCheckOfProduct = (id,shouldProductBeChecked)=>{
    return{
        type:SETCHECKOFPRODUCT,
        id,
        shouldProductBeChecked
    }
}