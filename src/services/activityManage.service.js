import { request, config, ajaxRequset } from '../utils'
const { api } = config
const { queryBatTxnTimeout, queryBatDtlTimeout, synchBatTxnTimeout, ignoreBatTxnTimeout, BatchExport, createActive, joinActive } = api

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
// 我创建的活动
export async function queryCreateActive (params) {
  return ajaxRequset({
    url: createActive,
    method: 'post',
    data: params,
  })
}
// 我参与的活动
export async function queryJoinActive (params) {
  return ajaxRequset({
    url: joinActive,
    method: 'post',
    data: params,
  })
}
