import React from "react"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import "./PlaylistsList.css"
import { useNavigate } from "react-router-dom"
import { usePlaylist } from "../../Context/playlistContext"
import { useAuth } from "../../Context/authContext"
import axios from "axios"
import { API } from "../../Utils/API"
const PlaylistsList = ({ plObj }) => {
  const { playlistDispatch } = usePlaylist()
  const { user } = useAuth()
  console.log(plObj, "plObj")
  const { playlistName, playlistItems } = plObj
  const playlistCover =
    playlistItems.length > 0 ? playlistItems[0].video.youtubeId : ""
  const navigate = useNavigate()
  const handlePlaylistClick = () => {
    playlistDispatch({
      type: "SET_PLAYLIST",
      payload: { playlistName, playlistItems },
    })
    navigate("/playlist")
  }
  const handleDeletePlaylist = async () => {
    try {
      if (user.isLoggedIn) {
        const { status } = await axios.delete(
          `${API}/api/playlist/${user.userData.userId}`,
          { data: { playlistName } }
        )
        if (status === 200) {
          playlistDispatch({
            type: "DELETE_PLAYLIST",
            payload: playlistName,
          })
        }
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="playlistsList">
        <div className="thumb">
          <p>
            <span className="w100">
              {playlistItems?.length} Videos <i></i>
            </span>
            <span className="w280" onClick={handlePlaylistClick}>
              <i>►</i> Play All
            </span>
          </p>
          <img
            src={`https://i3.ytimg.com/vi/${playlistCover}/hqdefault.jpg`}
            alt=""
          />
        </div>
        <div className="playlistsList__info">
          <p>{playlistName && playlistName} </p>
          <span>
            <DeleteForeverOutlinedIcon
              className="delete-icon"
              onClick={handleDeletePlaylist}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlaylistsList
