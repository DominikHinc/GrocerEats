import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, SETCHECKOFPRODUCT } from "../actions/GroceryListActions"



const initialState = {
    productsList: []
}

export default (state = initialState, action) => {
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
                let addedAmount = parseFloat(action.product.amountMain);
                
                currentAmount  += addedAmount;
                
                let copyOfProductList = state.productsList;
                copyOfProductList[addedAmountProductIndex].amountMain = currentAmount;

                return {...state, productsList:copyOfProductList}
            }

        case REMOVE_PRODUCT:
            const newProductsList = state.productsList.filter(item => item.id !== action.id);
            return { ...state, productsList: newProductsList }
        case EDIT_PRODUCT:
            return state
        case SETCHECKOFPRODUCT:
            const index = state.productsList.findIndex(item => item.id === action.id)
            const copy = state.productsList;
            copy[index].isChecked = action.shouldProductBeChecked;

            return {...state, productsList:copy};
        default:
            return state
    }
}