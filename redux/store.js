import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./reducers/authSlice";
import shopReducer from "./reducers/shopSlice";

const reducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
});

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
