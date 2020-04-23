import request2 from '@/utils/request2'
import request from '@/utils/request'

export function getPage(query) {
  return request2({
    url: '/need/list',
    method: 'get',
    params: { data: JSON.stringify(query).replace("\'", '"') }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/programmer-notes/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/programmer-notes/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function save(data) {
  return request2({
    url: '/need/update',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request2({
    url: '/need/delete',
    method: 'post',
    data
  })
}

