import React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { Avatar } from "@mui/material"
import "./Header.css"
import logo from "../images/moontube-logo.png"
export const Header = () => {
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
        <div className="header__logo">
          <span style={{ color: "red" }}>M</span>
          <span style={{ fontSize: "20px" }}>T</span>
          <span style={{ color: "red", fontSize: "20px" }}>U</span>
          <span style={{ fontSize: "20px" }}>B</span>

          <span style={{ color: "red", fontSize: "20px" }}>E</span>
        </div>
      </div>
      <div className="header__middle">
        <input type="text" placeholder="Search..." />
        <SearchIcon className="header__searchButton" />
      </div>
      <div className="header__right">
        <Avatar
          className="header__avatar"
          alt="avatar"
          src="https://yt3.ggpht.com/yti/APfAmoH_bozIJd9y4Fk5zISUUkImojkq5E_VCAbHtog2=s88-c-k-c0x00ffffff-no-rj-mo"
        />
      </div>
    </div>
  )
}
