import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/employees.vue'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'import',
      name: 'import',
      component: () => import('@/views/employees/import.vue'),
      meta: { title: 'Excel导入', icon: 'people' },
      hidden: true
    },
    {
      // path: 'detail',  //传统路由跳转，有？id=
      path: 'detail/:id', // 动态路由传参，可以省区路径上面的？id=
      name: 'detail',
      component: () => import('@/views/employees/detail.vue'),
      meta: { title: 'Excel导入', icon: 'people' },
      hidden: true
    }

  ]

}
