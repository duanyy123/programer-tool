/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const blogRouter = {
  path: '/blog',
  component: Layout,
  redirect: '/blog/complex-table',
  name: 'Blog',
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
    }, {
      path: 'create/:type/:id',
      component: () => import('@/views/blog/create-blog'),
      name: 'CreateBlog',
      meta: { title: '修改笔记', icon: 'edit' },
      hidden: true
    }, {
      path: 'create/:type',
      component: () => import('@/views/blog/create-blog'),
      name: 'CreateBlog',
      meta: { title: '新建笔记', icon: 'edit' },
      hidden: true
    }, {
      path: 'watch/:title/:id',
      component: () => import('@/views/blog/watch-blog'),
      name: 'WatchBlog',
      meta: { title: '查看笔记', icon: 'edit' },
      hidden: true
    }
  ]
}
export default blogRouter
