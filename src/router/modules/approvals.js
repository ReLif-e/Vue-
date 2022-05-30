import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  children: [{
    path: '',
    name: 'approvals',
    component: () => import('@/views/approvals/approvals.vue'),
    meta: { title: '审批', icon: 'tree-table' }
  }]

}
