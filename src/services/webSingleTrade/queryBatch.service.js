import { request, config } from '../../utils'
const { api } = config
const { querySingleTrade } = api

export async function query (params) {
  return request({
    url: querySingleTrade,
    method: 'post',
    data: params,
  })
}
