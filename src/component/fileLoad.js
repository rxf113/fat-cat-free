import React from "react"
import axios from "axios"

const download = function download(fileId, success, fail) {
  let options = {
    method: "GET",
    responseType: "blob",
    url: `https://rxf113.xyz/fat-cat/api/download?fileId=${fileId}`
  }
  axios(options)
    .then(res => {
      success(res)
    }).catch(error => {
    fail(error)
  })
}

const convert = function convert(fileId, success, fail) {
  let promise = axios(`https://rxf113.xyz/fat-cat/api/convert?fileId=${fileId}`)
  promise.then(function(response) {
    success(response)
  }).catch(function(error) {
    fail(error)
  })
}

const upload = function upload(file, success, fail) {
  let fd = new FormData()
  ///let file = document.getElementById("fileInputId").files[0];
  fd.append("file", file)
  console.log("==============")
  console.log(file.path);
  console.log("==============")
  const options = {
    method: "POST",
    headers: { "content-type": "multipart/form-data"},
    data: fd,
    //url: "https://rxf113.xyz/utils/api/upLoadPicture",
    timeout: 10000,
    url: "https://rxf113.xyz/fat-cat/api/upload"
  }

  let promise = axios(options)
  promise.then(function(response) {
    success(response)
  }).catch(function(error) {
    fail(error)
    //success("response")
  })
}


export { upload, convert, download }