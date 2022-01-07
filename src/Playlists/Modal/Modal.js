import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { usePlaylist } from "../../Context/playlistContext"
import { useStateContext } from "../../Context/stateContext"
import { API } from "../../Utils/API"
import "./Modal.css"

export const Modal = ({ vidObj, useparam }) => {
  const [modal, setModal] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { state, dispatch } = useStateContext()
  const { playlistDispatch, playlistState } = usePlaylist()
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log(vidObj, "vidObj to get _id of current video")
  const createPlaylist = (playlistName, vidObj) => {
    if (playlistName !== "") {
      const plObj = {
        playlistName,
        vidObj,
      }

      playlistDispatch({ type: "ADD_TO_PLAYLIST", payload: plObj })
      setModal(false)
    }
  }
  // console.log(inputValue, "inputValue From Name")
  //   console.log(plObj, "plObj")

  const handleCreateAndAddToPlaylist = async (
    playlistName,
    vidObj,
    videoId
  ) => {
    try {
      if (user.isLoggedIn && playlistName && videoId !== "") {
        const { status } = await axios.post(
          `${API}/api/playlist/${user.userData.userId}/${videoId}`,
          { playlistName }
        )
        if (status === 200) {
          createPlaylist(playlistName, vidObj)
        }
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleRemoveFromPlaylist = async (playlistName, videoId) => {
    console.log(playlistName, videoId, "playlistName, videoId")
    try {
      if (user.isLoggedIn && playlistName !== "" && videoId !== "") {
        const { status } = await axios.delete(
          `${API}/api/playlist/${user.userData.userId}/${videoId}`,
          { data: { playlistName } }
        )
        if (status === 200) {
          playlistDispatch({
            type: "REMOVE_FROM_PLAYLIST",
            payload: {
              playlistName: playlistName,
              vid: videoId,
            },
          })
        }
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const toggleModal = () => {
    if (user.isLoggedIn) {
      dispatch({ type: "TOGGLE_PLAYLIST_MODAL", payload: false })
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      {state.playlistModal ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal__content">
            <div className="top">
              <span>Save to...</span>
              <span className="close-modal" onClick={toggleModal}>
                ❌
              </span>
            </div>
            <div className="middle__section">
              <div className="middle">
                {playlistState?.playlist.map((playlistObj, idx) => {
                  const isChecked = playlistObj?.playlistItems?.findIndex(
                    (check) => check?.video?.youtubeId == useparam
                  )
                  console.log(
                    isChecked,
                    vidObj?._id,
                    "isChecked and vidObj._id"
                  )
                  return (
                    <label key={idx.toString()}>
                      <input
                        type="checkbox"
                        checked={isChecked !== -1}
                        onChange={() =>
                          isChecked === -1
                            ? handleCreateAndAddToPlaylist(
                                playlistObj.playlistName,
                                vidObj,
                                vidObj?._id
                              )
                            : handleRemoveFromPlaylist(
                                playlistObj.playlistName,
                                vidObj?._id
                              )
                        }
                      />
                      {playlistObj.playlistName}
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="bottom">
              {!modal && (
                <div className="bottom__text" onClick={() => setModal(!modal)}>
                  <span>➕</span>
                  <span>Create new Playlist</span>
                </div>
              )}
              {modal && (
                <div className="bottom__create">
                  <div className="bottom__create_info">
                    <label htmlFor="">Name </label>
                    <span
                      className="close__create"
                      onClick={() => setModal(!modal)}
                    >
                      ❌
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div
                    className="bottom__create-btn"
                    onClick={() => createPlaylist(inputValue, vidObj)}
                  >
                    CREATE
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
