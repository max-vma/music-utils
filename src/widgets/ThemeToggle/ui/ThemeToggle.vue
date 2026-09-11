<template>
  <button
    type="button"
    role="switch"
    :aria-checked="themeStore.isDark"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    :class="$style['theme-toggle']"
    @click="themeStore.toggleTheme()">
    <Moon
      v-if="themeStore.isDark"
      :class="$style['theme-toggle-icon']"
      width="18px"
      height="18px" />
    <Sunny
      v-else
      :class="$style['theme-toggle-icon']"
      width="18px"
      height="18px" />
    <span :class="$style['theme-toggle-label']">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useThemeStore } from '@/shared/model/theme';

const themeStore = useThemeStore();

const label = computed(() => (themeStore.isDark ? 'Тёмная тема' : 'Светлая тема'));
const ariaLabel = computed(() => (themeStore.isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'));
</script>

<style lang="less" module>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  color: #fff;
  background-color: transparent;
  border: 1px solid rgb(255 255 255 / 60%);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(255 255 255 / 15%);
  }

  &-icon {
    flex-shrink: 0;
  }

  &-label {
    font-size: 14px;
    white-space: nowrap;
  }
}

@media (width <= 480px) {
  .theme-toggle-label {
    display: none;
  }
}
</style>
