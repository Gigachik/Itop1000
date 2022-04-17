import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import ratesReducer from "../modules/currency/store/ratesReducer";
import logger from "redux-logger";

let reducers = combineReducers({
    rates: ratesReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

export default store;
