import React from "react"
import ReactDOM from "react-dom"
// import "normalize.css"
import "./index.css"
import App from "./App"

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
