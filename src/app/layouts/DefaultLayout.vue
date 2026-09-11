<template>
  <ElContainer :class="['default-layout']">
    <ElContainer>
      <ElHeader class="header">
        <nav
          aria-label="Основная навигация"
          class="header-nav">
          <el-menu
            mode="horizontal"
            background-color="#1c5fb0"
            text-color="#fff">
            <el-menu-item index="1">
              <RouterLink :to="FRETBOARD_SCALES_URL">Визуализатор гамм</RouterLink>
            </el-menu-item>
          </el-menu>
        </nav>

        <ThemeToggle />
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
import { ThemeToggle } from '@/widgets/ThemeToggle';
</script>

<style scoped>
.default-layout {
  height: 100vh;
  height: 100dvh;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-nav {
  flex: 1;
  min-width: 0;
}

.footer {
  padding: 12px;
  text-align: center;
}

@media (width <= 480px) {
  .header {
    padding: 0 8px;
  }
}
</style>
