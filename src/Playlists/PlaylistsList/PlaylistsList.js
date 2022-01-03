import React from "react"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import "./PlaylistsList.css"
import { useNavigate } from "react-router-dom"
const PlaylistsList = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="playlistsList">
        <div className="thumb">
          <p>
            <span className="w100">
              10 Videos <i></i>
            </span>
            <span className="w280" onClick={() => navigate("/playlist")}>
              <i>►</i> Play All
            </span>
          </p>
          <img
            src="http://i3.ytimg.com/vi/1XXVknMiVfc/maxresdefault.jpg
"
            alt=""
          />
        </div>
        <div className="playlistsList__info">
          <p>Playlist Name </p>
          <span>
            <DeleteForeverOutlinedIcon className="delete-icon" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlaylistsList
