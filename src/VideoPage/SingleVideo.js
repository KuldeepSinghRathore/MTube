import React from "react"

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import "./SingleVideo.css"
import { useStateContext } from "../Context/stateContext"

export const SingleVideo = () => {
  const { state } = useStateContext()
  console.log(state.currentVideo, "state in SingleVideo")
  return (
    <div className="singleVideo">
      <div className="singleVideo_flex">
        <iframe
          className="singleVideo__frame"
          src={`https://www.youtube.com/embed/${state.currentVideo.youtubeId}`}
          frameBorder="0"
          allowFullScreen
          title={state.currentVideo.title}
        />

        <h4>{state.currentVideo.title}</h4>
        <div className="singleVideo__info">
          <div>
            {" "}
            <p>By {state.currentVideo.creator}</p>
            <p>{state.currentVideo.views} views</p>
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
