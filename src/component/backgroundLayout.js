import React from "react"
import * as containerStyles from "./background.module.css"
import "bulma/css/bulma.min.css"
import InlineCards from "./inlineCards"

export default () => {

  let defaultPath = "/fileInput"

  return (
    <div className={containerStyles.background}>
      <InlineCards
        left={{ img: "https://rxf113.xyz/static/ptow.jpg", path: defaultPath, title: "pdf转word" }}
        right={{ img: "https://rxf113.xyz/static/zphd.jpg", path: "https://rxf113.xyz/utils/pic/pic-convert.html", title: "照片换底" }}
      />
    </div>)
}

