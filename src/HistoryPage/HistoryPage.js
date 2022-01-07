import React from "react"
import { useStateContext } from "../Context/stateContext"
import VideoCard from "../VideoPage/Components/VideoCard/VideoCard"

const HistoryPage = () => {
  const { state } = useStateContext()

  return (
    <div className="videoPage">
      <h2>Watch History</h2>
      <div className="videoPage__videos">
        {state.history.length > 0 ? (
          state?.history.map(({ video }, idx) => (
            <VideoCard key={idx.toString()} videoObj={video} />
          ))
        ) : (
          <div>
            <h2>No History Please Go Watch A Video</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
