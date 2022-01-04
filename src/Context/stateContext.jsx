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
  const getAllVideos = async () => {
    setIsLoading(true)
    const { data, status } = await axios.get(`${API}/api/videos`)

    console.log(data, "data")

    if (status === 200) {
      dispatch({ type: "LOAD_VIDEOS", payload: data.videos })
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
      case "SET_CURRENT_VIDEO":
        return { ...state, currentVideo: action.payload }

      default:
        return state
    }
  }
  const initialState = {
    videos: [],
    currentVideo: null,
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
