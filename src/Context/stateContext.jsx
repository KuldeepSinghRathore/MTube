import axios from "axios"
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import { API } from "../Utils/API"
import { setupAuthHeaderForServiceCalls } from "./authContext"
import { useAuth } from "./authContext"

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { token } = user?.userData

  const getAllVideos = async () => {
    const { data, status } = await axios.get(`${API}/api/videos`)

    console.log(data, "data")

    if (status === 200) {
      dispatch({ type: "LOAD_VIDEOS", payload: data.videos })
      dispatch({ type: "FILTER_BY", payload: "All" })
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    try {
      getAllVideos()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])

  useEffect(() => {
    // useEffect Get History
    if (token) {
      const getHistory = async (token) => {
        try {
          const { status, data } = await axios.get(
            `${API}/api/history`,
            setupAuthHeaderForServiceCalls(token)
          )

          if (status === 200) {
            dispatch({
              type: "LOAD_HISTORY",
              payload: data.history.historyItems,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
      getHistory(token)
    }
  }, [token])

  useEffect(() => {
    // useEffect getLiked
    const getLiked = async (token) => {
      try {
        const { status, data } = await axios.get(
          `${API}/api/liked`,
          setupAuthHeaderForServiceCalls(token)
        )

        if (status === 200) {
          dispatch({
            type: "LOAD_LIKED",
            payload: data.liked.likedItems,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getLiked(token)
    }
  }, [token])

  useEffect(() => {
    // useEffect getSaved
    // getSaved
    const getSaved = async (token) => {
      try {
        const { status, data } = await axios.get(
          `${API}/api/saved`,
          setupAuthHeaderForServiceCalls(token)
        )

        if (status === 200) {
          dispatch({
            type: "LOAD_SAVED",
            payload: data.saved.savedItems,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getSaved(token)
    }
  }, [token])

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_VIDEOS":
        return { ...state, videos: action.payload }
      case "LOAD_HISTORY":
        return { ...state, history: action.payload }
      case "LOAD_LIKED":
        return { ...state, liked: action.payload }
      case "LOAD_SAVED":
        return { ...state, saved: action.payload }
      case "FILTER_BY":
        return {
          ...state,
          filtered:
            action.payload !== "All"
              ? state.videos.filter((video) => video.creator === action.payload)
              : state.videos,
        }
      case "SELECT_BY":
        return { ...state, selectBy: action.payload }
      case "SEARCH_BY":
        return { ...state, searchBy: action.payload }
      case "ADD_TO_HISTORY":
        return {
          ...state,
          history: [...state.history, { video: action.payload }],
        }
      case "ADD_TO_LIKED":
        return { ...state, liked: [...state.liked, { video: action.payload }] }
      case "REMOVE_FROM_LIKED":
        return {
          ...state,
          liked: state.liked.filter(
            (video) =>
              video.video._id.toString() !== action.payload._id.toString()
          ),
        }

      case "ADD_TO_SAVED":
        return {
          ...state,
          saved: [...state.saved, { video: action.payload }],
        }
      case "REMOVE_FROM_SAVED":
        return {
          ...state,
          saved: state.saved.filter(
            (video) => video.video._id !== action.payload._id
          ),
        }
      case "TOGGLE_PLAYLIST_MODAL":
        return { ...state, playlistModal: action.payload }
      case "LOGOUT":
        return { ...state, history: [], liked: [], saved: [] }
      default:
        return state
    }
  }
  const initialState = {
    videos: [],
    history: [],
    liked: [],
    saved: [],
    filtered: [],
    selectBy: "All",
    searchBy: "",
    playlistModal: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const values = {
    state,
    dispatch,
    isLoading,
  }
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
