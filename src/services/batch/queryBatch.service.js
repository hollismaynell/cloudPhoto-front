import { request, config } from '../../utils'
const { api } = config
const { queryBatch, BatchQueryOne, BatchExport } = api

export async function query (params) {
  return request({
    url: queryBatch,
    method: 'get',
    data: params,
  })
}

export async function queryOne (params) {
  return request({
    url: BatchQueryOne,
    method: 'get',
    data: params,
  })
}

export async function queryExport (params) {
  return request({
    url: BatchExport,
    method: 'get',
    data: params,
  })
}
