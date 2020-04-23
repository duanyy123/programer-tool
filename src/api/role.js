import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/programmer-notes/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/programmer-notes/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/programmer-notes/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/programmer-notes/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/programmer-notes/role/${id}`,
    method: 'delete'
  })
}
