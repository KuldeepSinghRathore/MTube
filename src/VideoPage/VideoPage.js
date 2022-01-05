import React from "react"
import { useStateContext } from "../Context/stateContext"
import { SelectBy } from "./Components/SelectBy/SelectBy"
import VideoCard from "./Components/VideoCard/VideoCard"
import "./VideoPage.css"
const VideoPage = () => {
  const { state, isLoading } = useStateContext()
  console.log(state.videos, "state")

  const toDisplay = state.filtered.length > 0 ? state.filtered : state.videos
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <SelectBy />

      <div className="videoPage">
        {/* <h2>I am Recommended</h2> */}
        <div className="videoPage__videos">
          {toDisplay.map((video) => (
            <VideoCard key={video._id} videoObj={video} />
          ))}
        </div>
      </div>
    </>
  )
}

export default VideoPage
