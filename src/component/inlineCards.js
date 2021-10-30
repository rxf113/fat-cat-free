import React from "react"
import Card from "./simpleCard"
import "bulma/css/bulma.min.css"

export default function inlineCards(props) {
  return (
    <div className="tile">
      <div className="tile is-parent">
        <Card img={props.left.img} path={props.left.path} title={props.left.title}/>
      </div>
      <div className="tile is-parent">
        <Card img={props.right.img} path={props.right.path} title={props.right.title}/>
      </div>
    </div>
  )
}