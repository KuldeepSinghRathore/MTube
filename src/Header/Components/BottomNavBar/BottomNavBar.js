import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"

import HistoryIcon from "@mui/icons-material/History"

import "./BottomNavBar.css"
import {
  HistoryOutlined,
  Subscriptions,
  SubscriptionsOutlined,
} from "@mui/icons-material"
export const BottomNavBar = (props) => {
  const [activeTabs, setActiveTabs] = useState("home")
  const navigate = useNavigate()

  return (
    <div className="bottom-nav">
      <div className="bn-tab">
        {activeTabs === "home" ? (
          <HomeIcon
            size="35"
            color="#000"
            className="color-icon"
            onClick={() => {
              setActiveTabs("home")
              navigate("/")
            }}
          />
        ) : (
          <HomeOutlinedIcon
            size="35"
            color="#000"
            onClick={() => {
              setActiveTabs("home")
              navigate("/")
            }}
          />
        )}
      </div>
      <div className="bn-tab">
        {activeTabs === "history" ? (
          <HistoryIcon
            size="35"
            color="#000"
            className="color-icon"
            onClick={() => {
              setActiveTabs("history")
              navigate("history")
            }}
          />
        ) : (
          <HistoryOutlined
            size="35"
            color="#000"
            onClick={() => {
              setActiveTabs("history")
              navigate("history")
            }}
          />
        )}
      </div>
      <div className="bn-tab">
        {activeTabs === "playlists" ? (
          <Subscriptions
            size="35"
            className="color-icon"
            onClick={() => {
              setActiveTabs("playlists")
              navigate("playlists")
            }}
          />
        ) : (
          <SubscriptionsOutlined
            size="35"
            color="#000"
            onClick={() => {
              setActiveTabs("playlists")
              navigate("playlists")
            }}
          />
        )}
      </div>
      <div className="bn-tab">
        {activeTabs === "library" ? (
          <VideoLibraryIcon
            size="35"
            color="#000"
            className="color-icon"
            onClick={() => {
              setActiveTabs("library")
              navigate("library")
            }}
          />
        ) : (
          <VideoLibraryOutlinedIcon
            size="35"
            color="#000"
            onClick={() => {
              setActiveTabs("library")
              navigate("library")
            }}
          />
        )}
      </div>
    </div>
  )
}
