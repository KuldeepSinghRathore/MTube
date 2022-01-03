import React from "react"
import HistoryPage from "../HistoryPage/HistoryPage"
import LikedPage from "../LikedPage/LikedPage"
import Playlists from "../Playlists/Playlists"

const Library = () => {
  return (
    <div style={{ flex: "0.8" }}>
      <h1>Library</h1>
      <HistoryPage />
      <LikedPage />
      <Playlists />
    </div>
  )
}

export default Library
