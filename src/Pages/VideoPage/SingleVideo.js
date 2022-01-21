import React, { useEffect, useState } from "react"

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import "./SingleVideo.css"
import { useStateContext } from "Context/stateContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

import { Modal } from "Pages/Playlists/Modal/Modal"
import { API } from "Utils/API"
import { useAuth } from "Context/authContext"
import { setupAuthHeaderForServiceCalls } from "Context/authContext"
import { toast } from "react-toastify"
export const isAlreadyExist = (arr, id) => {
  return arr.find(({ video }) => video._id.toString() === id.toString())
    ? true
    : false
}
const currentVideoFind = (videos, id) => {
  return videos.find((video) => video._id.toString() === id.toString())
}
export const SingleVideo = () => {
  const { state, dispatch } = useStateContext()
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [video, setVideo] = useState(currentVideoFind(state.videos, id))

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, status } = await axios.get(`${API}/api/videos/${id}`)
        if (status === 200) {
          setVideo(data.video)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [id])
  const currentVideo = video

  const handleLikeButton = (payload, dispatch, navigate) => {
    if (user.isLoggedIn) {
      dispatch({ type: "ADD_TO_LIKED", payload })
    } else {
      navigate("/login")
    }
  }
  const removeLikeButton = (payload, dispatch, navigate) => {
    if (user.isLoggedIn) {
      dispatch({ type: "REMOVE_FROM_LIKED", payload })
    } else {
      navigate("/login")
    }
  }
  const handleSavedButton = (payload, dispatch, navigate) => {
    if (user.isLoggedIn) {
      dispatch({ type: "ADD_TO_SAVED", payload })
    } else {
      navigate("/login")
    }
  }
  const removeSavedButton = (payload, dispatch, navigate) => {
    if (user.isLoggedIn) {
      dispatch({ type: "REMOVE_FROM_SAVED", payload })
    } else {
      navigate("/login")
    }
  }

  const isLiked = isAlreadyExist(state.liked, currentVideo?._id)
  const isSaved = isAlreadyExist(state.saved, currentVideo?._id)
  const addToLiked = async () => {
    try {
      if (user.isLoggedIn) {
        const { status } = await axios.post(
          `${API}/api/liked/${currentVideo._id}`,
          setupAuthHeaderForServiceCalls(user.userData.token)
        )
        if (status === 200) {
          handleLikeButton(currentVideo, dispatch, navigate)
          toast.success(`Added To Liked`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
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
          `${API}/api/liked/${currentVideo._id}`,
          setupAuthHeaderForServiceCalls(user.userData.token)
        )
        if (status === 200) {
          removeLikeButton(currentVideo, dispatch, navigate)
          toast.success(`Remove From Liked`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
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
          `${API}/api/saved/${currentVideo._id}`,
          setupAuthHeaderForServiceCalls(user.userData.token)
        )
        if (status === 200) {
          handleSavedButton(currentVideo, dispatch, navigate)
          toast.success(`Added To Saved`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
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
          `${API}/api/saved/${currentVideo._id}`,
          setupAuthHeaderForServiceCalls(user.userData.token)
        )
        if (status === 200) {
          removeSavedButton(currentVideo, dispatch, navigate)
          toast.success(`Removed from Saved`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
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
                user.isLoggedIn
                  ? dispatch({ type: "TOGGLE_PLAYLIST_MODAL", payload: true })
                  : navigate("/login")
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
