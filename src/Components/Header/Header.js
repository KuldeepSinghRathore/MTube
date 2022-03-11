import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import "./Header.css"
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
        <div className="header__logo" onClick={() => navigate("/")}>
          <span style={{ color: "red" }}>M</span>
          <span style={{ fontSize: "20px" }}>T</span>
          <span style={{ color: "red", fontSize: "20px" }}>U</span>
          <span style={{ fontSize: "20px" }}>B</span>

          <span style={{ color: "red", fontSize: "20px" }}>E</span>
        </div>
      </div>
      {path === "/" && (
        <div className="header__middle">
          <input
            type="text"
            placeholder={"Search..."}
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
      )}
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
