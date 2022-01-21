import React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { Avatar } from "@mui/material"
import "./Header.css"
// import logo from "images/moontube-logo.png"
import BackspaceIcon from "@mui/icons-material/Backspace"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "Context/authContext"
import { useStateContext } from "Context/stateContext"
export const Header = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { state, dispatch } = useStateContext()
  const path = useLocation().pathname
  const handleSearch = (e) => {
    dispatch({ type: "SEARCH_BY", payload: e.target.value })
  }

  return (
    <div className="header">
      <div className="header__left">
        {/* <MenuIcon /> */}
        {/* <div>Moon</div> */}
        {/* <img
          className="header__logo"
          // src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
          src={logo}
          alt="logo"
        /> */}
        <div className="header__logo" onClick={() => navigate("/")}>
          <span style={{ color: "red" }}>M</span>
          <span style={{ fontSize: "20px" }}>T</span>
          <span style={{ color: "red", fontSize: "20px" }}>U</span>
          <span style={{ fontSize: "20px" }}>B</span>

          <span style={{ color: "red", fontSize: "20px" }}>E</span>
        </div>
      </div>
      <div className="header__middle">
        <input
          type="text"
          placeholder={path !== "/" ? "Only Allowed at HomePage" : "Search..."}
          disabled={path !== "/"}
          onChange={handleSearch}
          value={state.searchBy}
        />
        {state.searchBy.length > 0 ? (
          <BackspaceIcon
            className="header__searchButton"
            onClick={() => dispatch({ type: "SEARCH_BY", payload: "" })}
          />
        ) : (
          <SearchIcon className="header__searchButton" />
        )}
      </div>
      <div className="header__right">
        {user.isLoggedIn ? (
          <div className="header__button" onClick={() => navigate("/user")}>
            Hi {user.userData.firstName}
          </div>
        ) : (
          <div className="header__button" onClick={() => navigate("/login")}>
            Login
          </div>
        )}
      </div>
    </div>
  )
}
