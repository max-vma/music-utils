<template>
  <div :class="$style['not-found']">
    <h1 :class="$style['not-found-title']">404</h1>
    <p>Страница не найдена</p>
    <RouterLink to="/">На главную</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="less" module>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 16px;

  &-title {
    font-size: 48px;
    font-weight: 700;
  }
}
</style>
