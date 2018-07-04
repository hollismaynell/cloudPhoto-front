import { request, config } from '../../utils'
const { api } = config
const { nodeInfo, getOneNode, menuLevs, parentLev, nodeInfoUpdate, nodeInfoDelete } = api

export async function query (params) {
  return request({
    url: nodeInfo,
    method: 'get',
    data: params,
  })
}
export async function queryLevs (params) {
  return request({
    url: menuLevs,
    method: 'get',
    data: params,
  })
}
export async function queryParentLev (params) {
  return request({
    url: parentLev,
    method: 'get',
    data: params,
  })
}
export async function queryOneNode (params) {
  return request({
    url: getOneNode,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: nodeInfo,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: nodeInfoDelete,
    method: 'post',
    data: params,
  })
}

export async function saveOneNode (params) {
  return request({
    url: nodeInfoUpdate,
    method: 'post',
    data: params,
  })
}
