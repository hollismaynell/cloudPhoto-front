import { request, config } from '../../utils'
const { api } = config
const { querySingle, SingleQueryOne } = api

export async function query (params) {
  return request({
    url: querySingle,
    method: 'get',
    data: params,
  })
}

export async function queryOne (params) {
  return request({
    url: SingleQueryOne,
    method: 'get',
    data: params,
  })
}
