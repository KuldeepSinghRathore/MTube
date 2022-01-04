import React from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../../../Context/stateContext"
import "./VideoCard.css"
const VideoCard = ({ videoObj }) => {
  const { title, creator, views, youtubeId } = videoObj
  const navigate = useNavigate()
  const { dispatch } = useStateContext()
  return (
    <div
      className="videoCard"
      onClick={() => {
        dispatch({ type: "SET_CURRENT_VIDEO", payload: videoObj })
        navigate(`/video/${youtubeId}`)
      }}
    >
      <img
        className="videoCard__thumbnail"
        // src={`http://i3.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        src={`http://i3.ytimg.com/vi/${youtubeId}/sddefault.jpg`}
        alt=""
      />
      <h4>{title}</h4>
      <div className="videoCard_info">
        <p>By {creator}</p>
        <p>{views} views</p>
      </div>
    </div>
  )
}

export default VideoCard
