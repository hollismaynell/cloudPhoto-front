import { request, config } from '../../utils'
const { api } = config
const { querySignListDale } = api

export async function query (params) {
  return request({
    url: querySignListDale,
    method: 'get',
    data: params,
  })
}
