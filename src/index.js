import React from "react"
import ReactDOM from "react-dom"
// import "normalize.css"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router } from "react-router-dom"
import { StateProvider } from "./Context/stateContext"
import { AuthProvider } from "./Context/authContext"
import { PlaylistProvider } from "./Context/playlistContext"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PlaylistProvider>
        <StateProvider>
          <Router>
            <App />
          </Router>
        </StateProvider>
      </PlaylistProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
