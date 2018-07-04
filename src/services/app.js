import { request, config } from '../utils'
const { api } = config
const { userLogout, userLogin, userToken } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}


export async function singleSignOut () {
  return request({
    url: 'http://10.10.8.202:7101/FineBI/ReportServer?op=fs_load&cmd=ssout',
    method: 'get',
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  // console.log(user.replace('/:id', ''))
  return request({
    url: userToken,
    method: 'get',
    data: params,
  })
}
