import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import ApiReducer from './reducers/ApiReducer';
import SavedRecipesReducer from './reducers/SavedRecipesReducer';



// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    savedRecipes: SavedRecipesReducer,
    api:ApiReducer
  })

  export default createStore(rootReducer, applyMiddleware(ReduxThunk))