/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/log-bug',
  name: 'Table',
  meta: {
    title: '异常数据记录',
    icon: 'list'
  },
  children: [
    // {
    //   path: 'dynamic-table',
    //   component: () => import('@/views/table/dynamic-table/index'),
    //   name: 'DynamicTable',
    //   meta: { title: 'Dynamic Table' }
    // },
    // {
    //   path: 'drag-table',
    //   component: () => import('@/views/table/drag-table'),
    //   name: 'DragTable',
    //   meta: { title: 'Drag Table' }
    // },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    // {
    //   path: 'complex-table',
    //   component: () => import('@/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // },
    {
      path: 'log-bug',
      component: () => import('@/views/table/log-bug'),
      name: 'LogBug',
      meta: { title: '业务QRZ记录' }
    },
    {
      path: 'code-bug',
      component: () => import('@/views/table/code-bug'),
      name: 'CodeBug',
      meta: { title: '代码错误记录' }
    },
    {
      path: 'need-data',
      component: () => import('@/views/table/need-data'),
      name: 'NeedData',
      meta: { title: '需求记录' }
    },
    {
      path: 'data-upload',
      component: () => import('@/views/table/data-upload'),
      name: 'DataUpload',
      meta: { title: '文件上传' }
    }
  ]
}
export default tableRouter
