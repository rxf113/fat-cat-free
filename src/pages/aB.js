import * as React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import Files from "react-files"


const fileInputStyle = {
  width: "500px",
  height: "500px",
  borderTop: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  lineHeight: "50px",
  margin: "0 auto 12px auto"

}


class Ddd extends React.Component {
  onFilesChange(files) {
    console.log(files)
  }

  onFilesError(error, file) {
    console.log("error code " + error.code + ": " + error.message)
  }

  render() {
    return (
      <div>
        <TransitionLink>
          
        </TransitionLink>
        <Files style={fileInputStyle}
          className='files-dropzone'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    )
  }

}

export default Ddd
