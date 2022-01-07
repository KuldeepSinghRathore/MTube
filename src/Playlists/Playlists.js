import React from "react"
import { useNavigate } from "react-router-dom"
import { usePlaylist } from "../Context/playlistContext"
import "./Playlists.css"
import PlaylistsList from "./PlaylistsList/PlaylistsList"
const Playlists = () => {
  const { playlistState } = usePlaylist()
  return (
    <div className="playlistsContainer">
      <h2>Playlists</h2>
      {playlistState.playlist.length > 0 ? (
        <div className="playlists">
          {playlistState.playlist.map((pl) => (
            <PlaylistsList key={pl.playlistName} plObj={pl} />
          ))}
        </div>
      ) : (
        <div className="playlists">
          {" "}
          <h2>No Playlists Found Please Create Playlist to See</h2>{" "}
        </div>
      )}
    </div>
  )
}

export default Playlists
