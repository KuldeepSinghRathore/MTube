import { createContext, useContext, useReducer } from "react"

export const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PLAYLIST":
        return { ...state, currentPlaylist: action.payload }

      case "ADD_TO_PLAYLIST":
        const isExist = state.playlist.find(
          (item) => item.playlistName === action.payload.playlistName
        )
          ? true
          : false
        const playlistObj = {
          playlistName: action.payload.playlistName,
          playlistItems: [
            {
              video: action.payload.vidObj,
            },
          ],
        }
        return {
          ...state,
          playlist: isExist
            ? state.playlist.map((item) => {
                return item.playlistName === action.payload.playlistName
                  ? (item = {
                      ...item,
                      playlistItems: [
                        ...item.playlistItems,
                        { video: action.payload.vidObj },
                      ],
                    })
                  : item
              })
            : [...state.playlist, playlistObj],
        }
      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.map((item) => {
            return item.playlistName === action.payload.playlistName
              ? (item = {
                  ...item,
                  playlistItems: item.playlistItems.filter(
                    (item) => item.video.youtubeId != action.payload.vid
                  ),
                })
              : item
          }),
        }

      case "DELETE_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.filter(
            (pl) => pl.playlistName !== action.payload
          ),
        }
      default:
        return state
    }
  }
  const initialState = {
    playlist: [
      {
        _id: "61ce25992541ac0225522f78",
        userwithId: "61cd67486fc08a15bc27b934",
        playlistName: "haseen",
        playlistItems: [
          {
            video: {
              _id: "61cce1eb7b1c34fa29b037fb",
              youtubeId: "5Lp0TaQxfrE",
              title: "What is the Best Type of Personality to Have?",
              creator: "Sadhguru",
              views: "538,121 ",
              createdAt: "2021-12-29T22:32:11.432Z",
              updatedAt: "2021-12-29T22:32:11.432Z",
              __v: 0,
            },
            _id: "61ce25992541ac0225522f79",
          },
          {
            video: {
              _id: "61cce1eb7b1c34fa29b037fd",
              youtubeId: "gLglQ5-Q9FE",
              title: "Harry Potter and The Methods Of Rationality: Chapter 1",
              creator: "RationalistFiction",
              views: "21,571",
              createdAt: "2021-12-29T22:32:11.433Z",
              updatedAt: "2021-12-29T22:32:11.433Z",
              __v: 0,
            },
            _id: "61ce26530c6725791543e810",
          },
        ],
        createdAt: "2021-12-30T21:33:13.382Z",
        updatedAt: "2021-12-30T21:36:19.429Z",
        __v: 1,
      },
      {
        _id: "61ce3d4c14f4627e83692547",
        userwithId: "61cd67486fc08a15bc27b934",
        playlistName: "chakkku",
        playlistItems: [
          {
            video: {
              _id: "61cce1eb7b1c34fa29b037f7",
              youtubeId: "1XXVknMiVfc",
              title: "Never Be Comfortable With Failure | Ankur Warikoo",
              creator: "Josh Talks",
              views: "4,393,898",
              createdAt: "2021-12-29T22:32:11.432Z",
              updatedAt: "2021-12-29T22:32:11.432Z",
              __v: 0,
            },
            _id: "61ce3d7114f4627e8369254e",
          },
        ],
        createdAt: "2021-12-30T23:14:20.262Z",
        updatedAt: "2021-12-30T23:43:32.733Z",
        __v: 2,
      },
    ],
    currentPlaylist: null,
  }
  const [playlistState, playlistDispatch] = useReducer(reducer, initialState)
  const values = {
    playlistState,
    playlistDispatch,
  }
  return (
    <PlaylistContext.Provider value={values}>
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => useContext(PlaylistContext)
