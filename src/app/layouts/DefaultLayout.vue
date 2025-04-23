<template>
  <ElContainer :class="['default-layout']">
    <ElContainer>
      <ElHeader>
        <div class="header">
          <el-menu
            mode="horizontal"
            background-color="#409EFF"
            text-color="#fff">
            <el-menu-item index="1">
              <RouterLink :to="FRETBOARD_SCALES_URL">Визуализатор гамм</RouterLink>
            </el-menu-item>
          </el-menu>
        </div>
      </ElHeader>

      <ElMain>
        <slot />
      </ElMain>

      <ElFooter>
        <div class="footer">© 2023 Мое приложение на Element Plus</div>
      </ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<script setup>
import { FRETBOARD_SCALES_URL } from '@/widgets/FretboardScalesControls/consts';
</script>

<style scoped>
.default-layout {
  height: 100vh;
}

/* .el-header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: #545c64;
  color: white;
}

.el-main {
  padding: 20px;
  background-color: #f5f5f5;
}

.el-footer {
  background-color: #ddd;
  text-align: center;
  padding: 10px;
} */
</style>
