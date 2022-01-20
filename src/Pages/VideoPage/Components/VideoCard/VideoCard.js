import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "Context/authContext"
import { useStateContext } from "Context/stateContext"
import { API } from "Utils/API"
import "./VideoCard.css"
const VideoCard = ({ videoObj }) => {
  const { title, creator, views, youtubeId } = videoObj
  const navigate = useNavigate()
  const { state, dispatch } = useStateContext()
  const { user } = useAuth()
  const clickButtonHandler = (payload, dispatch, navigate, navigateTo) => {
    dispatch({ type: "ADD_TO_HISTORY", payload })
    navigateTo
      ? navigate(`/video/${navigateTo}`)
      : navigate(`/video/${payload.youtubeId}`)
  }
  const addToHistory = async () => {
    try {
      if (user.isLoggedIn) {
        const { data, status } = await axios.post(
          `${API}/api/history/${user.userData.userId}/${videoObj._id}`,
          {}
        )
        if (status === 200) {
          console.log(data, "l27")
          clickButtonHandler(videoObj, dispatch, navigate)
        }
      } else {
        navigate(`/video/${videoObj.youtubeId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(user, "user", videoObj, "videoObj", "for histor")
  return (
    <div
      className="videoCard"
      onClick={() => {
        // clickButtonHandler(videoObj, dispatch, navigate)
        addToHistory()
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
