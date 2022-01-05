import React from "react"

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import "./SingleVideo.css"
import { useStateContext } from "../Context/stateContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../Context/authContext"
import { API } from "../Utils/API"
export const SingleVideo = () => {
  const { state, dispatch } = useStateContext()
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const currentVideoFind = (videos, id) => {
    return videos.find((video) => video.youtubeId === id)
  }

  const currentVideo = currentVideoFind(state.videos, id)

  const handleLikeButton = (payload, dispatch, navigate) => {
    dispatch({ type: "ADD_TO_LIKED", payload })
  }
  const removeLikeButton = (payload, dispatch, navigate) => {
    dispatch({ type: "REMOVE_FROM_LIKED", payload })
  }
  const isAlreadyExist = (arr, id) => {
    return arr.find(({ video }) => video._id == id) ? true : false
  }
  const isLiked = isAlreadyExist(state.liked, currentVideo._id)
  console.log(isAlreadyExist(state.liked, currentVideo._id), "isAlreadyExist")
  const addToLiked = async () => {
    try {
      if (user.isLoggedIn) {
        const { status, data } = await axios.post(
          `${API}/api/liked/${user.userData.userId}/${currentVideo._id}`,
          {}
        )
        if (status === 200) {
          handleLikeButton(currentVideo, dispatch, navigate)
        }
      } else {
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const removeFromLiked = async () => {
    try {
      if (user.isLoggedIn) {
        const { status, data } = await axios.delete(
          `${API}/api/liked/${user.userData.userId}/${currentVideo._id}`,
          {}
        )
        if (status === 200) {
          removeLikeButton(currentVideo, dispatch, navigate)
          // dispatch({
          //   type: "LOAD_LIKED",
          //   payload: data.liked.likedItems,
          // })
        }
      } else {
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="singleVideo">
      <div className="singleVideo_flex">
        <iframe
          className="singleVideo__frame"
          src={`https://www.youtube.com/embed/${currentVideo?.youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
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
            {isLiked ? (
              <ThumbUpAltIcon onClick={removeFromLiked} />
            ) : (
              <ThumbUpOffAltOutlinedIcon onClick={addToLiked} />
            )}
            <BookmarkBorderIcon style={{ margin: "0 15px" }} />
            <PlaylistAddIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
