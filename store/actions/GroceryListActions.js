export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const SETCHECKOFPRODUCT = 'SET_CHECK_OF_PRODUCT'


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

export const setCheckOfProduct = (id,shouldProductBeChecked)=>{
    return{
        type:SETCHECKOFPRODUCT,
        id,
        shouldProductBeChecked
    }
}