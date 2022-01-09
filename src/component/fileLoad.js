import React from "react"
import axios from "axios"

const getDownloadFunc = function getDownloadFunc(fileId, success, fail, url) {

  return function () {
    let options = {
      method: "GET",
      responseType: "blob",
      url: `${url}?fileId=${fileId}`
    }
    axios(options)
      .then(res => {
        success(res)
      }).catch(error => {
        fail(error)
      })
  }
}


const geUploadFunc = function geUploadFunc(file, success, fail, url) {

  return function () {
    let fd = new FormData()
    fd.append("file", file)

    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      data: fd,
      timeout: 10000,
      url: url
    }

    let promise = axios(options)
    promise.then(function (response) {
      success(response)
    }).catch(function (error) {
      fail(error)
    })
  }
}


const getConvertFunc = function getConvertFunc(fileId, success, fail, url) {
  return function () {
    let promise = axios(`${url}?fileId=${fileId}`)
    promise.then(function (response) {
      success(response)
    }).catch(function (error) {
      fail(error)
    })
  }
}

//pdf转word功能 ==========================

const pdf2WordDownload = function (fileId, success, fail) {
  return getDownloadFunc(fileId, success, fail, "http://192.168.1.5:9999/api/download");
}
const pdf2WordUpload = function (file, success, fail) {
  return geUploadFunc(file, success, fail, "http://192.168.1.5:9999/api/upload");
}
const pdf2WordConvert = function (fileId, success, fail) {
  return getConvertFunc(fileId, success, fail, "http://192.168.1.5:9999/api/convert");
}


const pdf2Word = {
  upload: pdf2WordUpload,
  convert: pdf2WordConvert,
  download: pdf2WordDownload
}

const type2Methods = {
  1: pdf2Word
}

//pdf转word功能 ==========================




export default type2Methods 