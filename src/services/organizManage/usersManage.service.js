import { request, config } from '../../utils/index'
const { api } = config
const { usersManages, usersManagesUpdate, usersManagesDetail, usersManagesCreate, dataDept, dataRole, usersManagesInactive, systemInfoSelect } = api

export async function query (params) {
  return request({
    url: usersManages,
    method: 'get',
    data: params,
  })
}
export async function queryDetail (params) {
  return request({
    url: usersManagesDetail,
    method: 'get',
    data: params,
  })
}

export async function queryDept (params) {
  return request({
    url: dataDept,
    method: 'get',
    data: params,
  })
}

export async function querySys (params) {
  return request({
    url: systemInfoSelect,
    method: 'get',
    data: params,
  })
}

export async function queryRole (params) {
  return request({
    url: dataRole,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: usersManagesCreate,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: usersManagesInactive,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: usersManagesUpdate,
    method: 'post',
    data: params,
  })
}
