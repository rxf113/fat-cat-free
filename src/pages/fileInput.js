import React, { Component, useState } from "react"
import Dropzone from "react-dropzone"
import * as fileInputCss from "./fileInput.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import type2Methods  from "../component/fileLoad"
import "animate.css"

const titleStyle = {
  width: "500px",
  height: "20%",
  margin: "0 auto 12px auto",
  paddingBottom: "10px",
  paddingTop: "20px",
  textAlign: "center"

}

const titleSpanStyle = {
  fontSize: "24px",
  color: "#777",
  fontFamily: "Palatino Linotype, Book Antiqua, Palatino, Helvetica, STKaiti, SimSun, serif"
}


const FILE_STATUE = {
  "NULL": 1,
  "SELECTED": 2,
  "UPLOADED": 3,
  "CONVERTED": 4,
  "UPLOADING": 5,
  "CONVERTING": 6
}

class FileInput extends Component {
  constructor(props) {
    super(props)
    this.onDrop = (files) => {
      if (this.state.files.length === 1) {
        return
      }


      let notMatch = true

      if (this.state.fileTypes) {
        for (let type of this.state.fileTypes) {
          if (files[0].path.endsWith(type)) {
            notMatch = false
          }
        }
        if (notMatch) {
          return
        }
      }



      this.setState({
        files: files,
        xBtnDisplay: "",
        confirmBtnDisplay: "",
        selectedFile: true,
        fileStatus: FILE_STATUE.SELECTED

      })
    }


    let title = null

    if (this.props.location && this.props.location.state) {
      title = this.props.location.state.title
    }

    let types = null
    if (props.location && props.location.state && props.location.state.fileTypes) {
      types = props.location.state.fileTypes

    }


    this.state = {
      xBtnDisplay: "hidden",
      confirmBtnDisplay: "hidden",
      files: [],
      selectedFile: false,
      fileStatus: FILE_STATUE.NULL,
      confirmBtnClassName: "button is-link is-light",
      msgDisplay: "none",
      msgClassName: "message is-danger animate__animated animate__fadeIn",
      msgInfo: null,
      fileTypes: types,
      title: title,
      featType: this.props.location.state.featType,
    }

    

    this.clearSelectedFile = this.clearSelectedFile.bind(this)
    this.convertUnit = this.convertUnit.bind(this)
    this.getUnitNameByNum = this.getUnitNameByNum.bind(this)
    this.fileHandler = this.fileHandler.bind(this)
    this.getFileName = this.getFileName.bind(this)
    this.resetFile = this.resetFile.bind(this)
    this.popAlert = this.popAlert.bind(this)
    this.getMethodByFeatType = this.getMethodByFeatType.bind(this)
  }


  //????????????
  resetFile() {
    this.setState({
      fileStatus: FILE_STATUE.NULL,
      confirmBtnDisplay: "hidden",
      files: [],
      selectedFile: false,
      confirmBtnClassName: "button is-link is-light"

    })
  }

  //????????????
  uploadSuccess = response => {
    if (response.data.code === 200) {
      console.log("????????????")
      console.log(response)
      //????????????
      this.setState({
        fileStatus: FILE_STATUE.UPLOADED,
        confirmBtnClassName: "button is-link is-light",
        fileId: response.data.data
      })
    } else {
      this.popAlert(response.data.msg)
      this.resetFile()
    }

  }

  uploadFailed = error => {
    console.log(error)
    console.log("????????????")
    this.popAlert("????????????")
    this.resetFile()
  }

  popAlert = (info) => {
    this.setState({ msgDisplay: "", msgInfo: info })
    setTimeout(() => {
      this.setState({
        msgClassName: "message is-danger animate__animated animate__fadeOutUp"
      })
      setTimeout(() => {
        this.setState({
          msgClassName: "message is-danger animate__animated animate__fadeIn"
        })
        this.setState({
          msgDisplay: "none"
        })
      }, 2000)
    }, 3000)


  }

  convertSuccess = response => {
    if (response.data.code === 200) {
      //????????????
      this.setState({
        fileStatus: FILE_STATUE.CONVERTED,
        confirmBtnClassName: "button is-link is-light",
        fileNum: "1234"
      })
    } else {
      this.popAlert(response.data.msg)
      this.resetFile()
    }

  }

  convertFailed = error => {
    console.log(error)
    console.log("????????????")
    this.popAlert("????????????")
    this.resetFile()
  }

  downloadSuccess = response => {
    let url = window.URL.createObjectURL(new Blob([response.data]))
    let link = document.createElement("a")
    link.style.display = "none"
    link.href = url
    link.setAttribute("download", this.getFileName(response.headers["content-disposition"]))
    document.body.appendChild(link)
    console.log(response)
    console.log(this.getFileName(response.headers["content-disposition"]))
    console.log(response.headers)
    link.click()
  }

  getFileName = val => {
    let array = val.split(";")
    const reg = new RegExp("^filename.*")
    for (let item of array) {
      item = item.trim()
      if (reg.test(item)) {
        return item.match("filename=(.*)")[1].replace(/"/g, "")
      }
    }
    return new Date().getMilliseconds() + ".jpg"

  }

  downloadFailed = error => {
    console.log(error)
    console.log("????????????")
    this.popAlert("????????????")
    this.resetFile()
  }


  getMethodByFeatType(featType) {
    console.log(type2Methods)
    return type2Methods[featType]
  }


  fileHandler() {
    let name2Method = this.getMethodByFeatType(this.state.featType);

    if (this.state.fileStatus === FILE_STATUE.SELECTED) {
      let file = this.state.files[0]

      this.setState({
        fileStatus: FILE_STATUE.UPLOADING,
        xBtnDisplay: "hidden",
        confirmBtnClassName: "button is-link is-light is-loading"
      })

      //??????
      name2Method.upload(file, this.uploadSuccess.bind(this), this.uploadFailed.bind(this))()

    } else if (this.state.fileStatus === FILE_STATUE.UPLOADED) {
      //????????????
      this.setState({
        fileStatus: FILE_STATUE.CONVERTING,
        confirmBtnClassName: "button is-link is-light is-loading"
      })

      //??????
      name2Method.convert(this.state.fileId, this.convertSuccess.bind(this), this.convertFailed.bind(this))()

    } else if (this.state.fileStatus === FILE_STATUE.CONVERTED) {
      //????????????
      this.setState({
        fileStatus: FILE_STATUE.NULL,
        confirmBtnDisplay: "hidden",
        files: [],
        selectedFile: false
      })

      name2Method.download(this.state.fileId, this.downloadSuccess.bind(this), this.downloadFailed.bind(this))()
    }

  }

  confirmUpload = <span>????????????</span>
  clickDownload = <span>????????????</span>
  clickConvert = <span>????????????,????????????</span>

  getConfirmBtnStyle = () => {
    switch (this.state.fileStatus) {
      case FILE_STATUE.SELECTED:
        return this.confirmUpload
      case FILE_STATUE.UPLOADING:
        return <span>?????????</span>
      case FILE_STATUE.UPLOADED:
        return this.clickConvert
      case FILE_STATUE.CONVERTING:
        return <span>?????????</span>
      case FILE_STATUE.CONVERTED:
        return this.clickDownload
    }
  }


  clearSelectedFile(acceptedFiles) {
    console.log(acceptedFiles)
    this.setState(({
      xBtnDisplay: "hidden",
      confirmBtnDisplay: "hidden",
      files: [],
      selectedFile: false
    }))
  }

  convertUnit(size, unitNum) {
    if (!unitNum) {
      unitNum = 1
    }
    if (size < 1024) {
      return `${size.toFixed(2)} ` + this.getUnitNameByNum(unitNum)
    }
    return this.convertUnit(size / 1024, unitNum + 1)
  }

  getUnitNameByNum(unitNum) {
    switch (unitNum) {
      case 1:
        return "bytes"
      case 2:
        return "kb"
      case 3:
        return "m"
      case 4:
        return "g"
    }
  }

  componentDidMount() {
    let types = this.state.types
    if (!types) {
      let item = window.sessionStorage.getItem("types")
      if (item) {
        types = JSON.parse(item)
        this.setState({ fileTypes: types })
      }
    } else {
      window.sessionStorage.setItem("types", JSON.stringify(types))
    }


    let title = this.state.title
    if (!title) {
      title = window.sessionStorage.getItem("title")
      if (title) {
        this.setState({ title: title })
      }
      window.sessionStorage.setItem("title", title)
    } else {
      window.sessionStorage.setItem("title", title)

    }
  }


  render() {

    const wrongBtnStyle = {
      marginLeft: "0.5%",
      float: "left",
      cursor: "pointer",
      visibility: this.state.xBtnDisplay,
      lineHeight: "40px",
      borderTop: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
      borderRight: "1px solid #ddd",
      borderStyle: "dashed",
      height: "40px",
      width: "40px",
      textAlign: "center"
    }

    const fileNameStyle = {
      width: "50%",
      height: "40px",
      borderTop: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
      borderRight: "1px solid #ddd",
      margin: "0 auto 0 20%",
      lineHeight: "40px",
      borderStyle: "dashed",
      float: "left"
    }

    const confirmBtnStyle = {
      marginLeft: "1%",
      visibility: this.state.confirmBtnDisplay
    }

    const msgStyle = {
      width: "15%",
      position: "absolute",
      top: "5%",
      left: "45%",
      display: this.state.msgDisplay
    }

    const selectedFile = <span>??????????????? : </span>
    const notSelectedFile = <span>??????????????? : </span>

    const files = this.state.files.map(file => {
      console.log(file)
      let sizeUnit = this.convertUnit(file.size)
      return (
        <span key={file.path}>
          {file.path} ({sizeUnit})
        </span>
      )
    })

    return (
      <div>
        <article style={msgStyle} className={this.state.msgClassName}>
          <div className="message-header">
            <p>{this.state.msgInfo}</p>
          </div>
          <div className="message-body">
            ??????????????????????????????!
          </div>
        </article>


        <div style={titleStyle}>
          <span style={titleSpanStyle}>{this.state.title}</span>
        </div>

        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div>
              <div {...getRootProps()} className={fileInputCss.dropzone}>
                <input {...getInputProps()} />
                <span>????????????????????????????????????????????????!</span>
              </div>
              <div>
                <div style={fileNameStyle}>
                  {this.state.selectedFile ? selectedFile : notSelectedFile}
                  {files}
                </div>
                <div style={wrongBtnStyle}>
                  <FontAwesomeIcon
                    icon={faTimes} className={fileInputCss.wrong}
                    onClick={this.clearSelectedFile.bind(this, this.state.files)} />
                </div>
                <button className={this.state.confirmBtnClassName} onClick={this.fileHandler} style={confirmBtnStyle}>
                  {this.getConfirmBtnStyle()}
                </button>

              </div>

            </div>
          )}
        </Dropzone>
      </div>
    )
  }
}

export default FileInput