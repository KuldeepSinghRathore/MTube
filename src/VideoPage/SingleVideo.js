import React from "react"

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import "./SingleVideo.css"
import { useStateContext } from "../Context/stateContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../Context/authContext"
import { API } from "../Utils/API"
import { Modal } from "../Playlists/Modal/Modal"
export const isAlreadyExist = (arr, id) => {
  return arr.find(({ video }) => video._id.toString() === id.toString())
    ? true
    : false
}
export const SingleVideo = () => {
  const { state, dispatch } = useStateContext()
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const currentVideoFind = (videos, id) => {
    return videos.find((video) => video.youtubeId == id)
  }

  const currentVideo = currentVideoFind(state.videos, id)
  console.log(currentVideo, "currentVideo after render")
  const handleLikeButton = (payload, dispatch, navigate) => {
    dispatch({ type: "ADD_TO_LIKED", payload })
  }
  const removeLikeButton = (payload, dispatch, navigate) => {
    dispatch({ type: "REMOVE_FROM_LIKED", payload })
  }
  const handleSavedButton = (payload, dispatch, navigate) => {
    dispatch({ type: "ADD_TO_SAVED", payload })
  }
  const removeSavedButton = (payload, dispatch, navigate) => {
    dispatch({ type: "REMOVE_FROM_SAVED", payload })
  }

  const isLiked = isAlreadyExist(state.liked, currentVideo?._id)
  // console.log(isAlreadyExist(state.liked, currentVideo?._id), "isAlreadyExist")
  const isSaved = isAlreadyExist(state.saved, currentVideo?._id)
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
        const { status } = await axios.delete(
          `${API}/api/liked/${user.userData.userId}/${currentVideo._id}`,
          {}
        )
        if (status === 200) {
          removeLikeButton(currentVideo, dispatch, navigate)
        }
      } else {
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const addToSaved = async () => {
    try {
      if (user.isLoggedIn) {
        const { status } = await axios.post(
          `${API}/api/saved/${user.userData.userId}/${currentVideo._id}`,
          {}
        )
        if (status === 200) {
          handleSavedButton(currentVideo, dispatch, navigate)
        }
      } else {
        navigate("/login")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const removeFromSaved = async () => {
    try {
      if (user.isLoggedIn) {
        const { status } = await axios.delete(
          `${API}/api/saved/${user.userData.userId}/${currentVideo._id}`,
          {}
        )
        if (status === 200) {
          removeSavedButton(currentVideo, dispatch, navigate)
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
          src={`https://www.youtube-nocookie.com/embed/${currentVideo?.youtubeId}`}
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
            <Modal vidObj={currentVideo} useparam={id} />
            {isLiked ? (
              <ThumbUpAltIcon onClick={removeFromLiked} />
            ) : (
              <ThumbUpOffAltOutlinedIcon onClick={addToLiked} />
            )}
            {isSaved ? (
              <BookmarkIcon
                onClick={removeFromSaved}
                style={{ margin: "0 15px" }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                onClick={addToSaved}
                style={{ margin: "0 15px" }}
              />
            )}

            <PlaylistAddIcon
              onClick={() =>
                dispatch({ type: "TOGGLE_PLAYLIST_MODAL", payload: true })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
