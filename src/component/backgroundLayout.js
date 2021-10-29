import React from "react"
import * as containerStyles from "./background.module.css"
import "bulma/css/bulma.min.css"
import InlineCards from "./inlineCards"

export default () => {
  return (
    <div className={containerStyles.background}>
      <InlineCards img={{
        left: "https://rxf113.xyz/static/ptow.jpg",
        right: "https://rxf113.xyz/static/ptow.jpg"
      }} href={"fileInput"}/>
      <InlineCards img={{
        left: "https://rxf113.xyz/static/ptow.jpg",
        right: "https://rxf113.xyz/static/ptow.jpg"
      }} href={"a"}/>
    </div>)
}

