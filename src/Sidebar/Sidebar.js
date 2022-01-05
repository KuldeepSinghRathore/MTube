import React from "react"
import { SidebarRow } from "./Components/SidebarRow"
import HomeIcon from "@mui/icons-material/Home"

import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import "./Sidebar.css"
import { History } from "@mui/icons-material"
export const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <h1>Hey Sidebar is Here</h1> */}
      <SidebarRow selected Icon={HomeIcon} title="Home" toNavigate="/" />
      <SidebarRow Icon={History} title="History" toNavigate="/history" />
      <SidebarRow
        Icon={SubscriptionsIcon}
        title="Playlists"
        toNavigate="/playlists"
      />
      <SidebarRow
        Icon={VideoLibraryIcon}
        title="Library"
        toNavigate="/library"
      />
      <SidebarRow Icon={BookmarkIcon} title="Saved" toNavigate="/saved" />
      <SidebarRow Icon={ThumbUpIcon} title="Liked" toNavigate="/liked" />
    </div>
  )
}
