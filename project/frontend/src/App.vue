<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 增强版导航栏 -->
  <nav class="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="flex items-center justify-between w-full md:w-auto">
          <div class="text-xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-graduation-cap mr-2 text-blue-600"></i>
            <span>学术知库</span>
          </div>
          <button class="md:hidden text-gray-500" id="mobileMenuBtn">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        <div class="hidden md:flex items-center space-x-6 w-full md:w-auto" id="navLinks">
          <RouterLink to="/resources" class="text-gray-600 hover:text-blue-600 font-medium">资源中心</RouterLink>
          <RouterLink to="/game-guides" class="text-gray-600 hover:text-blue-600 font-medium">游戏攻略</RouterLink>
          <RouterLink to="/history" class="text-gray-600 hover:text-blue-600 font-medium">历史回顾</RouterLink>
          <RouterLink to="/profile" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-colors">
            <i class="fas fa-user-graduate mr-1"></i>个人中心
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <!-- 路由视图 -->
  <RouterView />

  <!-- 增强版页脚 -->
  <footer class="bg-white border-t border-gray-200 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold mb-4 text-gray-800">关于我们</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-600">项目简介</a></li>
            <li><a href="#" class="hover:text-blue-600">研究团队</a></li>
          </ul>
        </div>
        <!-- 其他页脚内容 -->
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2023 知库 - 学术知识管理平台 | <a href="#" class="hover:text-blue-600">隐私政策</a></p>
      </div>
    </div>
  </footer>
</template>

<style>
/* 导入字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

body {
  font-family: 'Noto Serif SC', serif;
  @apply bg-gray-50 text-gray-900;
}
</style>