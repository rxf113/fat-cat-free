import React from "react"
import * as cardStyle from "./simpleCard.module.css"
import { Link } from "gatsby"

export default function cardComponent(props) {
  return (
    <div className={cardStyle.ripple}>
      <Link target="_blank" swipe="true" direction="right" top={"exit"} to={"" + props.path}  state={{title: props.title, fileTypes: ['pdf']}}>

          {/*<img src={props.img} className={cardStyle.imgStyle}/>*/}
          <img src={props.img} className={cardStyle.box}/>

      </Link>
    </div>



  )
}