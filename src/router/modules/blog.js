/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const blogRouter = {
  path: '/blog',
  component: Layout,
  redirect: '/blog/complex-table',
  name: 'Table',
  meta: {
    title: '笔记',
    icon: 'icon'
  },
  children: [
    {
      path: 'work-blog',
      component: () => import('@/views/blog/work-blog'),
      name: 'WorkBlog',
      meta: { title: '工作感想' }
    }, {
      path: 'tech-blog',
      component: () => import('@/views/blog/tech-blog'),
      name: 'TechBlog',
      meta: { title: '新技术' }
    }, {
      path: 'learn-blog',
      component: () => import('@/views/blog/learn-blog'),
      name: 'LeanBlog',
      meta: { title: '学习内容' }
    }, {
      path: 'like-blog',
      component: () => import('@/views/blog/like-blog'),
      name: 'LikeBlog',
      meta: { title: '个人爱好' }
    }, {
      path: 'code-blog',
      component: () => import('@/views/blog/code-blog'),
      name: 'CodeBlog',
      meta: { title: '编程笔记' }
    }
  ]
}
export default blogRouter
