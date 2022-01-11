import React from "react"
import * as containerStyles from "./background.module.css"
import Card from "./simpleCard"


export default () => {

  let defaultPath = "/fileInput"

  return (
    <div className={containerStyles.background}>
      <Card img="https://rxf113.xyz/static/ptow.jpg" path={defaultPath} title="pdf转word" fileTypes={['pdf']} featType={1} />
      <Card img="https://rxf113.xyz/static/zphd.jpg" path="https://rxf113.xyz/utils/pic/pic-convert.html" title="照片换底" />
      <Card img="https://rxf113.xyz/static/ptow.jpg" path={defaultPath} title="png转svg" fileTypes={['png']} featType={2} />
    </div>)
}

