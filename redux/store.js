import { createWrapper } from "next-redux-wrapper";
const { configureStore, applyMiddleware } = require("@reduxjs/toolkit");
const thunk = require("redux-thunk");
const masterReducer = require("./reducers");

const store = ()=> configureStore({reducer: masterReducer}, {}, applyMiddleware(thunk));

export const wrapper = createWrapper(store);