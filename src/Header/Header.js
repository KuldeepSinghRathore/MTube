import React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { Avatar } from "@mui/material"
import "./Header.css"
export const Header = () => {
  return (
    <div className="header">
      <MenuIcon />
      <img
        className="header__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
        alt="logo"
      />
      <input type="text" />
      <SearchIcon />
      <Avatar
        alt="avatar"
        src="https://yt3.ggpht.com/yti/APfAmoH_bozIJd9y4Fk5zISUUkImojkq5E_VCAbHtog2=s88-c-k-c0x00ffffff-no-rj-mo"
      />
    </div>
  )
}
