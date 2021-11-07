import React from "react"
import Background from "../component/backgroundLayout"
import "bulma/css/bulma.min.css"



const navigate = {
  width: "100%",
  height: "50px",
  borderTop: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  lineHeight: "50px",
  margin: "0 15%"
}
const text = {
  fontSize: "24px",
  color :'#777',
  fontFamily : "Palatino Linotype, Book Antiqua, Palatino, Helvetica, STKaiti, SimSun, serif",
}


export default function Home() {
  return <div>
      <div style={navigate}>
        <a style={text} href="#">😨😨😨😨😨😨😨</a>
      </div>

    <Background/>
  </div>
}
