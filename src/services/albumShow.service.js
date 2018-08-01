import { config, ajaxRequset } from '../utils'
const { api } = config
const { activeSelect } = api

export async function query (params) {
  return ajaxRequset({
    url: activeSelect,
    method: 'post',
    data: params,
  })
}
