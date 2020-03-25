import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, SETCHECKOFPRODUCT, EDIT_PRODUCT_AMOUNT, SET_NEW_PRODUCTS_LIST, REMOVE_MULTIPLE_PRODUCTS, SET_CHECK_OF_MULTIPLE_PRODUCTS, DELETE_ALL_PRODUCTS_MENT_TO_BE_REMOVED } from "../actions/GroceryListActions"



const initialState = {
    productsList: [
         {
          "aisle": "Baking",
          "amountMain": "2",
          "amountSecondary": 473,
          "id": 10020081,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
          "isChecked": undefined,
          "title": "Unbleached flour",
          "unitMain": "cups",
          "unitSecondary": "ml",
        },
         {
          "aisle": "Oil, Vinegar, Salad Dressing",
          "amountMain": "2",
          "amountSecondary": 2,
          "id": 4053,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
          "isChecked": undefined,
          "title": "Olive oil",
          "unitMain": "tablespoons",
          "unitSecondary": "Tbsps",
        },
         {
          "aisle": "Beverages",
          "amountMain": "6",
          "amountSecondary": 6,
          "id": 14412,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/water.png",
          "isChecked": undefined,
          "title": "Water",
          "unitMain": "tablespoons",
          "unitSecondary": "Tbsps",
        },
         {
          "aisle": "Baking",
          "amountMain": "0.5",
          "amountSecondary": 118,
          "id": 20081,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/flour.png",
          "isChecked": undefined,
          "title": "Flour",
          "unitMain": "cup",
          "unitSecondary": "ml",
        },
         {
          "aisle": "Pasta and Rice",
          "amountMain": "0.67",
          "amountSecondary": 158,
          "id": 11549,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/tomato-sauce-or-pasta-sauce.jpg",
          "isChecked": undefined,
          "title": "Pizza sauce",
          "unitMain": "cup",
          "unitSecondary": "ml",
        },
         {
          "aisle": "Cheese",
          "amountMain": "1",
          "amountSecondary": 237,
          "id": 1031009,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png",
          "isChecked": undefined,
          "title": "Sharp cheddar cheese",
          "unitMain": "cup",
          "unitSecondary": "ml",
        },
         {
          "aisle": "Cheese",
          "amountMain": "0.5",
          "amountSecondary": 118,
          "id": 1001026,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/shredded-cheese-white.jpg",
          "isChecked": undefined,
          "title": "Shredded mozzarella cheese",
          "unitMain": "cup",
          "unitSecondary": "ml",
        },
         {
          "aisle": "Cheese",
          "amountMain": "0.5",
          "amountSecondary": 118,
          "id": 1040,
          "imageUrl": "https://spoonacular.com/cdn/ingredients_100x100/Swiss-cheese.jpg",
          "isChecked": undefined,
          "title": "Swiss cheese",
          "unitMain": "cup",
          "unitSecondary": "ml",
        },
      ],
    idOfProductsToDelete:[]
}

export default (state = initialState, action) => {
    let copyOfProductList;
    switch (action.type) {
        case ADD_PRODUCT:
            if (state.productsList.find(item => item.id === action.product.id) === undefined) {
                const newProduct = action.product;
                console.log(newProduct)
                console.log(state.productsList)
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
            // const newProductsList = state.productsList.filter(item => item.id !== action.id);
            
            return { ...state, idOfProductsToDelete:[...state.idOfProductsToDelete, action.id] }
        case REMOVE_MULTIPLE_PRODUCTS:
            // if(action.idsArray.length > 0){
            //    copyOfProductList = state.productsList.filter(item=>{
            //     return action.idsArray.find(id =>{
            //         return id === item.id;
            //     }) === undefined
            // })
            // return{...state, productsList:[...copyOfProductList]} 
            // }
            return { ...state, idOfProductsToDelete:[...state.idOfProductsToDelete, ...action.idsArray] }
        case DELETE_ALL_PRODUCTS_MENT_TO_BE_REMOVED:
            copyOfProductList = state.productsList.filter(item=>{
                return state.idOfProductsToDelete.find(id => id === item.id) === undefined
            })
            return{...state, productsList:[...copyOfProductList], idOfProductsToDelete:[]} 
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
        case SET_CHECK_OF_MULTIPLE_PRODUCTS:
            if(action.idsArray.length > 0){
                console.log(action.shouldAllBeChecked)
                copyOfProductList = state.productsList.map(item=>{
                    return action.idsArray.find(id => id === item.id) !== undefined ? {...item, isChecked:action.shouldAllBeChecked} : item
                });
             return{...state, productsList:[...copyOfProductList]} 
             }
             return state
        case SET_NEW_PRODUCTS_LIST:
            return {...state,productsList:[...action.productsList]}
        default:
            return state
    }
}