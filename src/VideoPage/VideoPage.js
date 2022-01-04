import React from "react"
import { useStateContext } from "../Context/stateContext"
import { SelectBy } from "./Components/SelectBy/SelectBy"
import VideoCard from "./Components/VideoCard/VideoCard"
import "./VideoPage.css"
const VideoPage = () => {
  const { state } = useStateContext()
  console.log(state.videos, "state")
  return (
    <>
      <SelectBy />

      <div className="videoPage">
        <h2>I am Recommended</h2>
        <div className="videoPage__videos">
          {state.videos.map((video) => (
            <VideoCard key={video.id} videoObj={video} />
          ))}
        </div>
      </div>
    </>
  )
}

export default VideoPage
