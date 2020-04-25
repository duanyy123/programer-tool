import request2 from '@/utils/request'
export function getPage(query) {
  return request2({
    url: '/code/list',
    method: 'get',
    params: { data: JSON.stringify(query).replace("\'", '"') }
  })
}
