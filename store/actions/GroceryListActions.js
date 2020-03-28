import { insertProduct, fetchSavedProducts, setProductAmount, deleteSavedRecipe, deleteProduct, setProductCheck, deleteAllProducts, updateProduct } from "../../helpers/db"
import { Alert } from "react-native"

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const REMOVE_MULTIPLE_PRODUCTS = 'REMOVE_MULTIPLE_PRODUCTS'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const SETCHECKOFPRODUCT = 'SET_CHECK_OF_PRODUCT'
export const EDIT_PRODUCT_AMOUNT = "EDIT_PRODUCT_AMOUNT"
export const SET_NEW_PRODUCTS_LIST = "SET_NEW_PRODUCTS_LIST"
export const SET_CHECK_OF_MULTIPLE_PRODUCTS = "SET_CHECK_OF_MULTIPLE_PRODUCTS"
export const DELETE_ALL_PRODUCTS_MENT_TO_BE_REMOVED = "DELETE_ALL_PRODUCTS_MENT_TO_BE_REMOVED"
export const LOAD_SAVED_PRODUCTS = 'LOAD_SAVED_PRODUCTS'
export const SWAP_TWO_PRODUCTS_ODRDER = 'SWAP_TWO_PRODUCTS_ODRDER'


export const addProduct = (product) => {
    return async dispatch => {
        try {
            const dbResault = await insertProduct(product.id, product.title, product.imageUrl, product.amountMain, product.amountSecondary, product.unitMain,
                product.unitSecondary, product.aisle, product.isChecked, false)

            console.log(dbResault)

            dispatch({ type: ADD_PRODUCT, product })
        } catch (error) {
            Alert.alert("Something went wrong.", error.message)
        }

    }
}
//This will only add product id to list that will delete it from Grocery list only after deleteAllProductsMentToBeRemoved is called
export const removeProduct = (id) => {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}
export const removeMultipleProduct = (idsArray) => {
    return {
        type: REMOVE_MULTIPLE_PRODUCTS,
        idsArray
    }
}
export const deleteAllProductsMentToBeRemoved = () => {
    return async (dispatch, getState) => {

        try {
            console.log(getState().groceryList.idOfProductsToDelete)

            getState().groceryList.idOfProductsToDelete.forEach(async item => {
                const dbResault = await deleteProduct(item);
                console.log(dbResault)
            })

            dispatch({ type: DELETE_ALL_PRODUCTS_MENT_TO_BE_REMOVED })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }

    }
}

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

export const setNewProductsList = (productsList) => {
    return async dispatch => {
        try {

            const dbResault = await deleteAllProducts();
            console.log(dbResault)
            productsList.forEach(async product =>{
                const insertDbResault = await insertProduct(product.id, product.title, product.imageUrl,product.amountMain, product.amountSecondary
                    ,product.unitMain,product.unitSecondary,product.aisle,product.isChecked, false )
                console.log(insertDbResault)
            })
            
            dispatch({type: SET_NEW_PRODUCTS_LIST,productsList})
        } catch (error) {
            
        }
        
    }
}

export const editProductAmount = (id, amountMain) => {
    return async dispatch => {
        try {
            const dbResault = await setProductAmount(id, amountMain)
            console.log(dbResault)
            dispatch({ type: EDIT_PRODUCT_AMOUNT, id, amountMain })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
    }
}

export const setCheckOfProduct = (id, shouldProductBeChecked) => {
    return async dispatch => {
        try {
            const dbResault = await setProductCheck(id, shouldProductBeChecked)
            console.log(dbResault)

            dispatch({ type: SETCHECKOFPRODUCT, id, shouldProductBeChecked })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }

    }
}
export const setCheckOfMultipleProducts = (idsArray, shouldAllBeChecked) => {
    return async dispatch => {
        try {
            idsArray.forEach(async id => {
                const dbResault = await setProductCheck(id, shouldAllBeChecked)
                console.log(dbResault)
            })

            dispatch({ type: SET_CHECK_OF_MULTIPLE_PRODUCTS, idsArray, shouldAllBeChecked })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }

    }
}

// export const swapTwoProductsOrder = (selectedIndex, moveAmount)=>{
//     return async (dispatch, getState)=>{
//         try {
//             const p1 = getState().groceryList.productsList[selectedIndex]
//             const p2 = getState().groceryList.productsList[selectedIndex + moveAmount]
//             const dbResault1 = await updateProduct(p2.id, 0, p1.title, p1.imageUrl, p1.amountMain, p1.amountSecondary, p1.unitMain, p1.unitSecondary,p1.aisle, p1.isChecked)
//             const dbResault2 = await updateProduct(p1.id, p2.id, p2.title, p2.imageUrl, p2.amountMain, p2.amountSecondary, p2.unitMain, p2.unitSecondary,p2.aisle, p2.isChecked)
//             const dbResault3 = await updateProduct(0, p1.id, p1.title, p1.imageUrl, p1.amountMain, p1.amountSecondary, p1.unitMain, p1.unitSecondary,p1.aisle, p1.isChecked)
//             console.log(dbResault1)
//             console.log(dbResault2)
//             console.log(dbResault3)
//             dispatch({type:SWAP_TWO_PRODUCTS_ODRDER, selectedIndex, moveAmount})
//         } catch (error) {
//             console.log(error.message)
//         }
//     }
// }

export const loadSavedProducts = () => {
    return async dispatch => {

        try {
            const dbResault = await fetchSavedProducts();
            console.log(dbResault)
            const productsList = dbResault.rows._array.map(item => {
                item.isChecked = item.isChecked === 0 ? true : false
                item.willBeDeleted = item.willBeDeleted === 0 ? true : false
                return item
            })

            dispatch({ type: SET_NEW_PRODUCTS_LIST, productsList: productsList })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }

    }

}