import { request, config } from '../utils'
const { api } = config
const { queryBatTxnTimeout, queryBatDtlTimeout, synchBatTxnTimeout, ignoreBatTxnTimeout, BatchExport } = api

export async function query (params) {
  return request({
    url: queryBatTxnTimeout,
    method: 'get',
    data: params,
  })
}

export async function queryOne (params) {
  return request({
    url: queryBatDtlTimeout,
    method: 'get',
    data: params,
  })
}

export async function synchOne (params) {
  return request({
    url: synchBatTxnTimeout,
    method: 'get',
    data: params,
  })
}

export async function ignoreOne (params) {
  return request({
    url: ignoreBatTxnTimeout,
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
