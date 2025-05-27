import React from "react"
import loader from "assests/loader.svg"
import "./Loader.css"
export const Loader = () => {
  return (
    <div className="loader">
      <div className=" ">
        <h1 className="">Please wait for a minute or Retry after 2 min.</h1>
        <p className="">Server Hosted On Free tier so it takes time</p>
      </div>
      <img src={loader} alt="loader" />
    </div>
  )
}
