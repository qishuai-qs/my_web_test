import { createRouter, createWebHistory } from 'vue-router'
import ResourcesView from '../views/ResourcesView.vue'
import GameGuidesView from '../views/GameGuidesView.vue'
import HistoryView from '../views/HistoryView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView,
      meta: { title: '资源中心' }
    },
    {
      path: '/game-guides',
      name: 'game-guides',
      component: GameGuidesView,
      meta: { title: '游戏攻略' }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { title: '历史回顾' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { title: '个人中心', requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/resources'
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 学术知库` : '学术知库'
  
  // 检查需要认证的路由
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'resources' })
  } else {
    next()
  }
})

function isAuthenticated() {
  // 这里实现实际的认证检查逻辑
  return false
}

export default router