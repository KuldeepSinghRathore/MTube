import axios from "axios"
import { createContext, useContext, useEffect, useReducer } from "react"
import { API } from "Utils/API"
import { setupAuthHeaderForServiceCalls } from "./authContext"
import { useAuth } from "./authContext"

export const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
  const { user } = useAuth()
  const { token } = user?.userData
  useEffect(() => {
    //   // getPlaylist
    const getPlaylist = async (token) => {
      try {
        const { status, data } = await axios.get(
          `${API}/api/playlist`,

          setupAuthHeaderForServiceCalls(token)
        )

        if (status === 200) {
          playlistDispatch({
            type: "LOAD_PLAYLIST",
            payload: data.playlist,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getPlaylist(token)
    }
  }, [token])

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_PLAYLIST":
        return { ...state, playlist: action.payload }
      case "SET_PLAYLIST":
        return { ...state, currentPlaylist: action.payload }

      case "ADD_TO_PLAYLIST":
        const isExist = state.playlist.find(
          (item) => item.playlistName === action.payload.playlistName
        )
          ? true
          : false
        const playlistObj = {
          playlistName: action.payload.playlistName,
          playlistItems: [
            {
              video: action.payload.vidObj,
            },
          ],
        }
        return {
          ...state,
          playlist: isExist
            ? state.playlist.map((item) => {
                return item.playlistName === action.payload.playlistName
                  ? (item = {
                      ...item,
                      playlistItems: [
                        ...item.playlistItems,
                        { video: action.payload.vidObj },
                      ],
                    })
                  : item
              })
            : [...state.playlist, playlistObj],
        }
      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.map((item) => {
            return item.playlistName === action.payload.playlistName
              ? (item = {
                  ...item,
                  playlistItems: item.playlistItems.filter(
                    (item) =>
                      item.video._id.toString() !==
                      action.payload.vid.toString()
                  ),
                })
              : item
          }),
        }

      case "DELETE_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.filter(
            (pl) => pl.playlistName !== action.payload
          ),
        }

      case "LOGOUT":
        return {
          playlist: [],
          currentPlaylist: null,
        }
      default:
        return state
    }
  }
  const initialState = {
    playlist: [],
    currentPlaylist: null,
  }
  const [playlistState, playlistDispatch] = useReducer(reducer, initialState)
  const values = {
    playlistState,
    playlistDispatch,
  }
  return (
    <PlaylistContext.Provider value={values}>
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => useContext(PlaylistContext)
