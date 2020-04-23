/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const toolRouter = {
  path: '/tool',
  component: Layout,
  redirect: '/table/json-tool',
  name: 'Tool',
  meta: {
    title: '实用工具',
    icon: 'table'
  },
  children: [
    {
      path: 'json-tool',
      component: () => import('@/views/tool/json-tool'),
      name: 'JsonTool',
      meta: { title: 'JSON格式化工具' }
    },
    {
      path: 'timestamp-util',
      component: () => import('@/views/tool/timestamp-util'),
      name: 'TimestampUtil',
      meta: { title: '时间戳转换工具' }
    },
    {
      path: 'press-util',
      component: () => import('@/views/tool/press-util'),
      name: 'PressUtil',
      meta: { title: '图片压缩工具' }
    },
    {
      path: 'sql-helper',
      component: () => import('@/views/tool/sql-helper'),
      name: 'SQLHelper',
      meta: { title: '常用SQL' }
    },
    {
      path: 'weekreport-create',
      component: () => import('@/views/tool/weekreport-create'),
      name: 'WeekReport',
      meta: { title: '周报生成器' }
    }
  ]
}
export default toolRouter
