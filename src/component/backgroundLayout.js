import React from "react"
import * as containerStyles from "./background.module.css"
import "bulma/css/bulma.min.css"
import InlineCards from "./inlineCards"

export default () => {

  let defaultPath = "/fileInput"

  return (
    <div className={containerStyles.background}>
      <InlineCards
        left={{ img: "https://rxf113.xyz/static/ptow.jpg", path: defaultPath, title: "我打你吗" }}
        right={{ img: "https://rxf113.xyz/static/ptow.jpg", path: defaultPath, title: "SA" }}
      />
      <InlineCards
        left={{ img: "https://rxf113.xyz/static/ptow.jpg", path: defaultPath, title: "来看看" }}
        right={{ img: "https://rxf113.xyz/static/ptow.jpg", path: defaultPath, title: "反反复复" }}
      />
    </div>)
}

