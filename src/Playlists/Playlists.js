import React from "react"
import { useNavigate } from "react-router-dom"
import "./Playlists.css"
import PlaylistsList from "./PlaylistsList/PlaylistsList"
const Playlists = () => {
  return (
    <div className="playlistsContainer">
      <h2>Playlists</h2>
      <div className="playlists">
        <PlaylistsList />
        <PlaylistsList />
        <PlaylistsList />
      </div>
    </div>
  )
}

export default Playlists
