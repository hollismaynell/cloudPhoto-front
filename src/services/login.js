import { request, config, ajaxRequset } from '../utils'

const { api } = config
const { userLogin } = api
export async function singleSign (data) {
  function cjkEncode (text) {
    if (text == null) {
      return ''
    }
    let newText = ''
    for (let i = 0; i < text.length; i++) {
      let code = text.charCodeAt (i)
      if (code >= 128 || code === 91 || code === 93) {
        `${newText}=[${code.toString(16)}]`
      } else {
        newText += text.charAt(i)
      }
    }
    return newText
  }

  return request({
    url: 'http://10.10.8.202:7101/FineBI/ReportServer?op=fs_load&cmd=sso',
    method: 'get',
    data: { fr_username: cjkEncode(data.username), fr_password: cjkEncode(data.password) },
  })
}

export async function login (data) {
  return ajaxRequset({
    url: userLogin,
    type: 'post',
    data: data,
  })
}
