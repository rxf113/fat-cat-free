import React from "react"
import * as cardStyle from "./simpleCard.module.css"

export default function cardComponent(props) {
  return (


        <a href={props.href} className={cardStyle.ripple}>
          {/*<img src={props.img} className={cardStyle.imgStyle}/>*/}
          <img src={props.img} className={cardStyle.box}/>
        </a>


  )
}