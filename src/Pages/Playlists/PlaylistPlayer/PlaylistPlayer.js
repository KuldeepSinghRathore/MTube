import React from "react"
import { usePlaylist } from "Context/playlistContext"
import VideoCard from "Pages/VideoPage/Components/VideoCard/VideoCard"

const PlaylistPlayer = () => {
  const { playlistState } = usePlaylist()
  return (
    <>
      {playlistState?.currentPlaylist !== null && (
        <div className="videoPage">
          <h2>{playlistState?.currentPlaylist?.playlistName} </h2>
          {playlistState?.currentPlaylist?.playlistItems.map(({ video }) => (
            <div className="videoPage__videos">
              <VideoCard key={video._id} videoObj={video} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PlaylistPlayer
