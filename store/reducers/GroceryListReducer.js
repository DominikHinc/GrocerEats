import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, SETCHECKOFPRODUCT, EDIT_PRODUCT_AMOUNT, SET_NEW_PRODUCTS_LIST } from "../actions/GroceryListActions"



const initialState = {
    productsList: []
}

export default (state = initialState, action) => {
    let copyOfProductList;
    switch (action.type) {
        case ADD_PRODUCT:
            if (state.productsList.find(item => item.id === action.product.id) === undefined) {
                const newProduct = action.product;
                console.log(newProduct)
                return { ...state, productsList: [...state.productsList, newProduct] }
            } else {
                console.log("Amount will be added")
                let addedAmountProductIndex = state.productsList.findIndex(item => item.id === action.product.id);
                let currentAmount = parseFloat(state.productsList[addedAmountProductIndex].amountMain);
                if(currentAmount >= 999999){
                    return state
                }
                let addedAmount = parseFloat(action.product.amountMain);
                
                currentAmount  += addedAmount;
                
                copyOfProductList = state.productsList;
                copyOfProductList[addedAmountProductIndex].amountMain = currentAmount;

                return {...state, productsList:[...copyOfProductList]}
            }

        case REMOVE_PRODUCT:
            const newProductsList = state.productsList.filter(item => item.id !== action.id);
            
            return { ...state, productsList: [...newProductsList] }
        case EDIT_PRODUCT:
            return state
        case EDIT_PRODUCT_AMOUNT:
            console.log("Item will be edited")
            const indexOfProductToEditAmount = state.productsList.findIndex(item => {return item.id === action.id})
            if(indexOfProductToEditAmount < 0 ){
                console.log("Item not found")
                return state
            }
            copyOfProductList = state.productsList;
            console.log(copyOfProductList[indexOfProductToEditAmount])
            copyOfProductList[indexOfProductToEditAmount].amountMain = action.amountMain;
            console.log(copyOfProductList[indexOfProductToEditAmount])

            return {...state, productsList:[...copyOfProductList]}

        case SETCHECKOFPRODUCT:
            const indexOfProductToChengeCheck = state.productsList.findIndex(item => item.id === action.id)
            copyOfProductList = state.productsList;
            copyOfProductList[indexOfProductToChengeCheck].isChecked = action.shouldProductBeChecked;

            return {...state, productsList:[...copyOfProductList]};
        case SET_NEW_PRODUCTS_LIST:
            return {...state,productsList:[...action.productsList]}
        default:
            return state
    }
}