import { request, config } from '../../utils'
const { api } = config
const { levNode, getOneLevNode, getMaxLev, levNodeDel, levNodeUpdate } = api

export async function query (params) {
  return request({
    url: levNode,
    method: 'get',
    data: params,
  })
}
export async function update (params) {
  return request({
    url: levNodeUpdate,
    method: 'post',
    data: params,
  })
}
export async function queryOneNode (params) {
  return request({
    url: getOneLevNode,
    method: 'get',
    data: params,
  })
}
export async function queryMaxLev (params) {
  return request({
    url: getMaxLev,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: levNode,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: levNodeDel,
    method: 'post',
    data: params,
  })
}

