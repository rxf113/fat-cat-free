import React from "react"
import * as cardStyle from "./simpleCard.module.css"
import { Link } from "gatsby"
import "bulma/css/bulma.min.css"

export default function cardComponent(props) {
  return (
    <div className="tile is-parent is-vertical is-6" style={{ display: "inline-block" }}>
      <div className={cardStyle.ripple}>
        <Link target="_blank" swipe="true" direction="right" top={"exit"} to={"" + props.path} state={{ title: props.title, fileTypes: props.fileTypes, featType: props.featType }}>

          {/*<img src={props.img} className={cardStyle.imgStyle}/>*/}
          <img src={props.img} className={cardStyle.box} />

        </Link>
      </div>
    </div>
  )
}