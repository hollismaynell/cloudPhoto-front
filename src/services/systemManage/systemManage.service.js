import { request, config } from '../../utils'
const { api } = config
const { systemInfoUpdate, systemInfo, systemInfoAdd, systemInfoQueryOne, systemInfoDel, systemInfoSelect, systemIsValid } = api

export async function update (params) {
  return request({
    url: systemInfoUpdate,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: systemInfo,
    method: 'get',
    data: params,
  })
}

export async function querySelect (params) {
  return request({
    url: systemInfoSelect,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: systemInfoDel,
    method: 'post',
    data: params,
  })
}
export async function queryOne (params) {
  return request({
    url: systemInfoQueryOne,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: systemInfoAdd,
    method: 'post',
    data: params,
  })
}
/* 是否生效 */
export async function setValid (params) {
  return request({
    url: systemIsValid,
    method: 'post',
    data: params,
  })
}

