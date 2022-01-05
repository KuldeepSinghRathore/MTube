import { NavigateNext } from "@mui/icons-material"
import React from "react"
import { useStateContext } from "../../../Context/stateContext"
import "./SelectBy.css"
export const SelectBy = () => {
  const { state, dispatch } = useStateContext()
  const category = [
    "All",
    ...new Set(state.videos.map((video) => video.creator)),
  ]
  console.log(category, "category")
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    })
  }
  return (
    <div className="selectBy">
      {category.map((creator, index) => (
        <div
          key={index.toString()}
          className="selectBy__tag"
          onClick={() => {
            dispatch({ type: "FILTER_BY", payload: creator })
            scrollToTop()
          }}
        >
          {creator}
        </div>
      ))}
      <NavigateNext className="next" />
    </div>
  )
}
