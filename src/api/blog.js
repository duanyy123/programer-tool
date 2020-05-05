import request2 from '@/utils/request2'
export function getPage(query) {
  return request2({
    url: '/blog/list',
    method: 'get',
    params: { data: JSON.stringify(query).replace("\'", '"') }
  })
}

export function save(data) {
  return request2({
    url: '/blog/update',
    method: 'post',
    data
  })
}

export function getBlogTypes() {
  return request2({
    url: '/blog/getBlogTypes',
    method: 'post'
  })
}

export function getBlogDetail(data) {
  return request2({
    url: '/blog/detail',
    method: 'get',
    params: { data: JSON.stringify(data).replace("\'", '"') }
  })
}
