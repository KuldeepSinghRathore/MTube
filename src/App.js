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
import { useStateContext } from "Context/stateContext"
import { Loader } from "Components/Loader/Loader"
import { useEffect } from "react"
import { PrivateRoutes } from "Auth/PrivateRoutes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const path = useLocation().pathname
  const { isLoading } = useStateContext()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="app">
      <ToastContainer />
      <Header />

      <div className="app_page">
        {path !== "/signup" && path !== "/login" && <Sidebar />}
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route
            path="/history"
            element={
              <PrivateRoutes>
                {" "}
                <HistoryPage />{" "}
              </PrivateRoutes>
            }
          />
          <Route
            path="/liked"
            element={
              <PrivateRoutes>
                {" "}
                <LikedPage />{" "}
              </PrivateRoutes>
            }
          />
          <Route
            path="/playlists"
            element={
              <PrivateRoutes>
                {" "}
                <Playlists />{" "}
              </PrivateRoutes>
            }
          />
          <Route
            path="/playlist"
            element={
              <PrivateRoutes>
                {" "}
                <PlaylistPlayer />
              </PrivateRoutes>
            }
          />
          <Route path="/video/:id" element={<SingleVideo />} />
          <Route
            path="library"
            element={
              <PrivateRoutes>
                {" "}
                <Library />{" "}
              </PrivateRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/liked"
            element={
              <PrivateRoutes>
                {" "}
                <LikedPage />{" "}
              </PrivateRoutes>
            }
          />
          <Route
            path="/saved"
            element={
              <PrivateRoutes>
                {" "}
                <SavedPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoutes>
                {" "}
                <User />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default App
