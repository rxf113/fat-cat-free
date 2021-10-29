import * as React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import InputFile from "./fileInput"
import Files from "react-files"
import uploadPng from "../../static/upload.png"
import wrongPng from "../../static/wrong.png"
import * as fileInputCss from "./fileInput.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee,faTimes } from '@fortawesome/free-solid-svg-icons'
import * as cardStyle from "../component/simpleCard.module.css"

const fileInputStyle = {
  width: "500px",
  height: "300px",
  borderTop: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  lineHeight: "50px",
  margin: "0 auto 12px auto"
}

const textStyle = {
  float: "left",
  paddingLeft: "25%"
}

const uploadPngStyle = {
  height: "20px",
  paddingLeft: "50%"
}

const divIconAndLable = {
  paddingTop: "15%"
}

const fileNameStyle = {
  width: "500px",
  height: "40px",
  paddingLeft: "1%",
  borderTop: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  margin: "0 auto 12px auto",
  lineHeight: "40px"
}



const wrongBtnStyle = {
  float: "right",
  cursor:"pointer",
  paddingRight: "10px"
}

export default function main(props) {

  console.log(props);

  function onFilesChange(files) {
    console.log(files)

  }

  function onFilesError(error, file) {
    console.log("error code " + error.code + ": " + error.message)
  }

  return (
    <div>
      <Files style={fileInputStyle}
             className='files-dropzone'
             onChange={onFilesChange}
             onError={onFilesError}
             multiple
             maxFiles={3}
             maxFileSize={10000000}
             minFileSize={0}
             clickable
      >
        <div style={divIconAndLable}>
          <img style={uploadPngStyle} src={uploadPng}/>
          <span style={textStyle}>拖拽文件到此处，或者点击选择文件!</span>
        </div>
        <br/>
      </Files>

      <div style={fileNameStyle}>
        <span>已选择文件 : </span>
        <span></span>
        <div style={wrongBtnStyle}>
          <FontAwesomeIcon
            icon={faTimes} className={fileInputCss.wrong}/>
        </div>
      </div>

    </div>
  )
}


