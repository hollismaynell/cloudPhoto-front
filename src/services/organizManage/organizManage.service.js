import { request, config } from '../../utils/index'
const { api } = config
const { organizManageCreate, organizManageUpdate, organizManageDelete, organizManages, dataDept } = api

export async function query (params) {
  return request({
    url: organizManages,
    method: 'get',
    data: params,
  })
}
// 所属机构
export async function queryInstuList (params) {
  return request({
    url: dataDept,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: organizManageCreate,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: organizManageDelete,
    method: 'post',
    data: params,
  })
}

export async function removeDeptNo (params) {
  return request({
    url: organizManageDelete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: organizManageUpdate,
    method: 'post',
    data: params,
  })
}
