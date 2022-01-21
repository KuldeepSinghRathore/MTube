import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "Context/authContext"
import { useStateContext } from "Context/stateContext"
import { API } from "Utils/API"
import "./VideoCard.css"
import { setupAuthHeaderForServiceCalls } from "Context/authContext"
const VideoCard = ({ videoObj }) => {
  const { title, creator, views, youtubeId } = videoObj
  const navigate = useNavigate()
  const { dispatch } = useStateContext()
  const { user } = useAuth()
  const clickButtonHandler = (payload, dispatch, navigate, navigateTo) => {
    dispatch({ type: "ADD_TO_HISTORY", payload })
    navigateTo
      ? navigate(`/video/${navigateTo}`)
      : navigate(`/video/${payload._id}`)
  }
  const addToHistory = async () => {
    try {
      if (user.isLoggedIn) {
        const { status } = await axios.post(
          `${API}/api/history/${videoObj._id}`,
          setupAuthHeaderForServiceCalls(user.userData.token)
        )
        if (status === 200) {
          clickButtonHandler(videoObj, dispatch, navigate)
        }
      } else {
        navigate(`/video/${videoObj._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className="videoCard"
      onClick={() => {
        addToHistory()
      }}
    >
      <img
        className="videoCard__thumbnail"
        src={`https://i3.ytimg.com/vi/${youtubeId}/sddefault.jpg`}
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
