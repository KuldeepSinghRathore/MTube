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
    setIsLoading(false)
    if (status === 200) {
      dispatch({ type: "LOAD_VIDEOS", payload: data.videos })
    }
  }
  useEffect(() => {
    try {
      getAllVideos()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOAD_VIDEOS":
        return { ...state, videos: action.payload }

      default:
        return state
    }
  }
  const initialState = {
    videos: [],
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const values = {
    state,
    dispatch,
  }
  return (
    <StateContext.Provider value={{ values }}>{children}</StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
