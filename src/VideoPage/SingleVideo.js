import React from "react"
import VideoCard from "./Components/VideoCard/VideoCard"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { ThumbDownAlt } from "@mui/icons-material"
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import "./SingleVideo.css"

export const SingleVideo = () => {
  return (
    <div className="singleVideo">
      <div className="singleVideo_flex">
        <iframe
          className="singleVideo__frame"
          src={`https://www.youtube.com/embed/1XXVknMiVfc`}
          frameBorder="0"
          allowFullScreen
          title={`Never Be Comfortable With Failure | Ankur Warikoo`}
        />

        <h4>Never Be Comfortable With Failure | Ankur Warikoo</h4>
        <div className="singleVideo__info">
          <div>
            {" "}
            <p>By Josh Talks</p>
            <p>4,393,898 views</p>
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
