import React from "react"
import VideoCard from "../VideoPage/Components/VideoCard/VideoCard"

const LikedPage = () => {
  const video = {
    youtubeId: "1XXVknMiVfc",
    title: "Never Be Comfortable With Failure | Ankur Warikoo",
    creator: "Josh Talks",
    views: "4,393,898",
  }
  return (
    <div className="videoPage">
      <h2>I am LikedPage</h2>
      <div className="videoPage__videos">
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
        <VideoCard videoObj={video} />
      </div>
    </div>
  )
}

export default LikedPage
