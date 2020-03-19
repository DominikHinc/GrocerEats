import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import ApiReducer from './reducers/ApiReducer';
import SavedRecipesReducer from './reducers/SavedRecipesReducer';
import GroceryListReducer from './reducers/GroceryListReducer';



// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    savedRecipes: SavedRecipesReducer,
    api:ApiReducer,
    groceryList:GroceryListReducer
  })

  export default createStore(rootReducer, applyMiddleware(ReduxThunk))