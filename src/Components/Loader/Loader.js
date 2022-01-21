import React from "react"
import loader from "assests/loader.svg"
import "./Loader.css"
export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  )
}
