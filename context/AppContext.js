"use client";

import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  product: "",
  limit: 10,
  allProducts: [],
  searchData: null,
  error: null,
  loading: false,
};

const actionTypes = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_LIMIT: "SET_LIMIT",
  SET_ALL_PRODUCTS: "SET_ALL_PRODUCTS",
  SET_SEARCH_DATA: "SET_SEARCH_DATA",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
};

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCT:
      return { ...state, product: action.payload };
    case actionTypes.SET_LIMIT:
      return { ...state, limit: action.payload };
    case actionTypes.SET_ALL_PRODUCTS:
      return { ...state, allProducts: [...state.allProducts, action.payload] };
    case actionTypes.SET_SEARCH_DATA:
      return { ...state, searchData: action.payload, error: null };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside of AppProvider");
  }

  return context;
};

export { AppProvider, useAppContext, actionTypes };
