/*
Start point
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./i18n.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const RootComponent = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<RootComponent />);
