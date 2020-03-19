export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'


export const addProduct = (id,title,amount,unit,image, aisle)=>{
    return {
        type:ADD_PRODUCT,
        id,
        title,
        amount,
        unit,
        image,
        aisle
    }
}

export const removeProduct = (id) =>{
    return {
        type:REMOVE_PRODUCT,
        id
    }
}

export const editProduct = (id,title,amount,unit,image, aisle) =>{
    return {
        type:EDIT_PRODUCT,
        id,
        title,
        amount,
        unit,
        image,
        aisle
    }
}