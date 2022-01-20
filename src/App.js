import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import { Header } from "Components/Header/Header"
import { Sidebar } from "Components/Sidebar/Sidebar"
import VideoPage from "Pages/VideoPage/VideoPage"
import HistoryPage from "Pages/HistoryPage/HistoryPage"
import LikedPage from "Pages/LikedPage/LikedPage"
import PlaylistPlayer from "Pages/Playlists/PlaylistPlayer/PlaylistPlayer"
import Playlists from "Pages/Playlists/Playlists"
import { SingleVideo } from "Pages/VideoPage/SingleVideo"
import Library from "Pages/Library/Library"
import Login from "Auth/Login/Login"
import SavedPage from "Pages/SavedPage/SavedPage"
import { SignUp } from "Auth/SignUp/SignUp"
import User from "Pages/User/User"
import { NotFound } from "Pages/NotFound/NotFound"
import { BottomNavBar } from "Components/Header/Components/BottomNavBar/BottomNavBar"

function App() {
  const path = useLocation().pathname
  console.log(path)
  return (
    <div className="app">
      <Header />
      <div className="app_page">
        {path !== "/signup" && path !== "/login" && <Sidebar />}
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist" element={<PlaylistPlayer />} />
          <Route path="/video/:id" element={<SingleVideo />} />
          <Route path="library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default App
