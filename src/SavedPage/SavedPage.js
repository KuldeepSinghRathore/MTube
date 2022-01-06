import React from "react"
import { useStateContext } from "../Context/stateContext"
import VideoCard from "../VideoPage/Components/VideoCard/VideoCard"

const SavedPage = () => {
  const { state } = useStateContext()
  return (
    <div className="videoPage">
      <h2>Saved Videos</h2>
      <div className="videoPage__videos">
        {state.saved.length > 0 ? (
          state?.saved.map(({ video }) => (
            <VideoCard key={video._id} videoObj={video} />
          ))
        ) : (
          <div>
            <h2>OOPs You Haven't Saved a Video Yet</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPage
