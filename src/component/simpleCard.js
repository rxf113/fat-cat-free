import React from "react"
import * as cardStyle from "./simpleCard.module.css"
import AniLink from 'gatsby-plugin-transition-link'

export default function cardComponent(props) {
  return (
    <div className={cardStyle.ripple}>
      <AniLink swipe="true" direction="right" top={"exit"} to={"" + props.href}>

          {/*<img src={props.img} className={cardStyle.imgStyle}/>*/}
          <img src={props.img} className={cardStyle.box}/>

      </AniLink>
    </div>



  )
}