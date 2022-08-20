import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { rootReducer } from "./store/reducers/rootReducer";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const root = ReactDOM.createRoot(document.getElementById("root"));

const middleware = [thunk];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

//const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
