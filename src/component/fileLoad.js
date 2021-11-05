import React from "react"
import axios from "axios"

const download = function download(success, fail) {
  let options = {
    method: "GET",
    responseType: "blob",
    url: `http://127.0.0.1:9999/api/download/`
  }
  axios(options)
    .then(res => {
      success(res)
    }).catch(error => {
    fail(error)
  })
}

const convert = function convert(success, fail) {
  let promise = axios("http://127.0.0.1:9999/api/convert")
  promise.then(function(response) {
    success(response)
  }).catch(function(error) {
    //fail(error)
    success("")
  })
}

const upload = function upload(file, success, fail) {
  let fd = new FormData()
  ///let file = document.getElementById("fileInputId").files[0];
  fd.append("file", file)
  const options = {
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
    data: fd,
    //url: "https://rxf113.xyz/utils/api/upLoadPicture",
    timeout: 10000,
    url: "http://127.0.0.1:9999/api/upLoadPicture"
  }

  let promise = axios(options)
  promise.then(function(response) {
    success(response)
  }).catch(function(error) {
    //fail(error)
    success("response")
  })
}


export { upload, convert, download }