import { insertProduct, fetchSavedProducts, setProductAmount, deleteSavedRecipe, deleteProduct, setProductCheck } from "../../helpers/db"
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
    return {
        type: SET_NEW_PRODUCTS_LIST,
        productsList
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