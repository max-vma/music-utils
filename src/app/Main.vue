<template>
  <component :is="CurrentLayoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLayoutStore } from '@/app/stores/layouts';

const { CurrentLayoutComponent } = useLayoutStore();
</script>
