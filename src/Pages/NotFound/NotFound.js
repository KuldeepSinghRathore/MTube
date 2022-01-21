import React from "react"
import notfound from "images/notfound.svg"
export const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        flex: "0.8",
        padding: "25px",
      }}
    >
      {/* <h2>Nott founde</h2> */}
      <img
        style={{ width: "80%", objectFit: "contain" }}
        src={notfound}
        alt=""
      />
      Not Found
    </div>
  )
}
