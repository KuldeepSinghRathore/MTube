import React from "react"
import { useStateContext } from "Context/stateContext"
import VideoCard from "Pages/VideoPage/Components/VideoCard/VideoCard"
import { SelectBy } from "Pages/VideoPage/Components/SelectBy/SelectBy"
import "./VideoPage.css"
const VideoPage = () => {
  const { state, isLoading } = useStateContext()

  const toDisplay = state.filtered.filter((video) =>
    Object.values(video)
      .join(" ")
      .toLowerCase()
      .includes(state.searchBy.toLowerCase())
  )
  return isLoading ? (
    <div>Loading...</div>
  ) : state.searchBy !== "" && !toDisplay.length > 0 ? (
    <h2>Nothin Match the Search Term</h2>
  ) : (
    <>
      <SelectBy />

      <div className="videoPage">
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
