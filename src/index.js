import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App.jsx"
import reportWebVitals from "./reportWebVitals"
import "tailwindcss/tailwind.css"
import "./config/defaultSettings"
import "../src/locales/i18n"
import theme from "./theme"

// react-redux
import { store, persistor } from "./redux/store"
import { Provider } from "react-redux"
// import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react"
import AlertComponent from "./components/Alert"
import { ThemeProvider } from "styled-components"

// const persistor = persistStore(store)
// console.log(persistor)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
