import "./App.css"
import { BottomNavBar } from "./Header/Components/BottomNavBar/BottomNavBar"
import { Header } from "./Header/Header"
import VideoPage from "./VideoPage/VideoPage"
import { Sidebar } from "./Sidebar/Sidebar"
import { SingleVideo } from "./VideoPage/SingleVideo"
import HistoryPage from "./HistoryPage/HistoryPage"
import LikedPage from "./LikedPage/LikedPage"
import { Route, Routes } from "react-router-dom"
import { NotFound } from "./NotFound/NotFound"
import Playlists from "./Playlists/Playlists"
import PlaylistPlayer from "./Playlists/PlaylistPlayer/PlaylistPlayer"
import Library from "./Library/Library"
import { SignUp } from "./Auth/SignUp/SignUp"
import Login from "./Auth/Login/Login"
import User from "./User/User"

function App() {
  return (
    <div className="app">
      {/* Header */}
      <Header />
      <div className="app_page">
        <Sidebar />
        {/* <Playlists /> */}
        {/* <PlaylistPlayer /> */}
        {/* <Playlists /> */}
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist" element={<PlaylistPlayer />} />
          <Route path="/video/:id" element={<SingleVideo />} />
          <Route path="library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default App
