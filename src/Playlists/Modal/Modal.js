import { useState } from "react"
import { usePlaylist } from "../../Context/playlistContext"
import { useStateContext } from "../../Context/stateContext"
import "./Modal.css"

export const Modal = ({ vidObj, useparam }) => {
  const [modal, setModal] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { state, dispatch } = useStateContext()
  const { playlistDispatch, playlistState } = usePlaylist()

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
  console.log(inputValue, "inputValue From Name")
  //   console.log(plObj, "plObj")
  return (
    <>
      {state.playlistModal ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal__content">
            <div className="top">
              <span>Save to...</span>
              <span
                className="close-modal"
                onClick={() => {
                  console.log("you clicked close icom")
                  dispatch({ type: "TOGGLE_PLAYLIST_MODAL", payload: false })
                }}
              >
                ❌
              </span>
            </div>
            <div className="middle__section">
              <div className="middle">
                {playlistState?.playlist.map((playlistObj, idx) => {
                  const isChecked = playlistObj?.playlistItems?.findIndex(
                    (check) => check?.video?.youtubeId == useparam
                  )
                  return (
                    <label key={idx.toString()}>
                      <input
                        type="checkbox"
                        checked={isChecked !== -1}
                        onChange={() =>
                          isChecked === -1
                            ? createPlaylist(playlistObj.playlistName, vidObj)
                            : playlistDispatch({
                                type: "REMOVE_FROM_PLAYLIST",
                                payload: {
                                  playlistName: playlistObj.playlistName,
                                  vid: useparam,
                                },
                              })
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
