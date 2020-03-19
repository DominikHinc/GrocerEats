import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } from "../actions/GroceryListActions"



const initialState = {
    productsList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            if (state.productsList.find(item => item.id === action.id) === undefined) {
                const newProduct = {
                    id: action.id,
                    title: action.title,
                    amount: action.amount,
                    unit: action.unit,
                    image: action.image,
                    aisle: action.aisle
                }
                console.log(newProduct)
                return { ...state, productsList: [...state.productsList, newProduct] }
            } else {

                let addedAmountProductIndex = state.productsList.findIndex(item => item.id === action.id);

                let currentAmount = parseFloat(state.productsList[addedAmountProductIndex].amount);
                let addedAmount = parseFloat(action.amount);
                currentAmount  += addedAmount;

                let copyOfProductList = state.productsList;
                copyOfProductList[addedAmountProductIndex].amount = currentAmount;

                return {...state, productsList:copyOfProductList}
            }

        case REMOVE_PRODUCT:
            const newProductsList = state.productsList.filter(item => item.id !== action.id);
            return { ...state, productsList: newProductsList }
        case EDIT_PRODUCT:
            return state
        default:
            return state
    }
}