import React from "react"

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
        src={
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm3f9w5j3.stackpathcdn.com%2Fwp-content%2Fuploads%2F404.jpg&f=1&nofb=1"
        }
        alt=""
      />
    </div>
  )
}
