import axios from "axios"
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import { API } from "../Utils/API"

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading, "isLoading")
  const getAllVideos = async () => {
    setIsLoading(true)
    const response = await axios.get(`${API}`)

    const { data, status } = await axios.get(`${API}/api/videos`)

    console.log(data, "data")

    if (status === 200) {
      dispatch({ type: "LOAD_VIDEOS", payload: data.videos })
      dispatch({ type: "FILTER_BY", payload: "All" })
    }
  }
  useEffect(() => {
    console.log("useEffect of videos loading")
    try {
      getAllVideos()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])
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
            (video) => video.video._id != action.payload._id
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
