import request2 from '@/utils/request2'
export function getPage(query) {
  return request2({
    url: '/blog/list',
    method: 'get',
    params: { data: JSON.stringify(query).replace("\'", '"') }
  })
}
