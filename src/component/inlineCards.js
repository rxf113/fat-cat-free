import React from "react"
import Card from "./simpleCard"
import "bulma/css/bulma.min.css"

export default function inlineCards(props) {
  return (
    <div className="tile">
      <div className="tile is-parent">
        <Card
          img={props.img.left}/>
      </div>
      <div className="tile is-parent">
        <Card
          img={props.img.right}/>
      </div>
    </div>
  )
}