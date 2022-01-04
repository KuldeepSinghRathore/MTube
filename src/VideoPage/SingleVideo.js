import React from "react"

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import "./SingleVideo.css"
import { useStateContext } from "../Context/stateContext"
import { useParams } from "react-router-dom"
export const SingleVideo = () => {
  const { state } = useStateContext()
  const { id } = useParams()
  const currentVideoFind = (videos, id) => {
    return videos.find((video) => video.youtubeId === id)
  }

  const currentVideo = currentVideoFind(state?.videos, id)
  return (
    <div className="singleVideo">
      <div className="singleVideo_flex">
        <iframe
          className="singleVideo__frame"
          src={`https://www.youtube.com/embed/${currentVideo?.youtubeId}`}
          frameBorder="0"
          allowFullScreen
          title={currentVideo?.title}
        />

        <h4>{currentVideo?.title}</h4>
        <div className="singleVideo__info">
          <div>
            {" "}
            <p>By {currentVideo?.creator}</p>
            <p>{currentVideo?.views} views</p>
          </div>
          <div>
            <ThumbUpOffAltOutlinedIcon />
            <BookmarkBorderIcon style={{ margin: "0 15px" }} />
            <PlaylistAddIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
