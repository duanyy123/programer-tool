import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/programmer-notes/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/programmer-notes/transaction/list',
    method: 'get',
    params: query
  })
}
