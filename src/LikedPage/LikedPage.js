import React from "react"
import { useStateContext } from "../Context/stateContext"
import VideoCard from "../VideoPage/Components/VideoCard/VideoCard"

const LikedPage = () => {
  const { state } = useStateContext()
  return (
    <div className="videoPage">
      <h2>I am LikedPage</h2>
      <div className="videoPage__videos">
        {state.liked.length > 0 ? (
          state?.liked.map(({ video }) => (
            <VideoCard key={video._id} videoObj={video} />
          ))
        ) : (
          <div>
            <h2>OOPs You Haven't Liked a Video Yet</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default LikedPage
