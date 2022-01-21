import React from "react"
import { useNavigate } from "react-router-dom"
import "./SidebarRow.css"
export const SidebarRow = ({ selected, Icon, title, toNavigate }) => {
  const navigateSideBar = useNavigate()
  return (
    <div>
      <div
        className={`sidebarRow ${selected && "selected"}`}
        onClick={() => navigateSideBar(toNavigate)}
      >
        <Icon className={`sidebarRow__icon `} />
        <h2 className="sidebarRow__title">{title}</h2>
      </div>
    </div>
  )
}
