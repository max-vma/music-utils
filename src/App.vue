<template>
  <Main />
</template>

<script setup lang="ts">
import Main from '@/app/Main.vue';
import { useThemeStore } from '@/shared/model/theme';

useThemeStore();
</script>
<style lang="less">
@import 'reset-css';

:root {
  --app-bg: #fff;
  --app-text: #303133;
  --app-text-muted: #606266;
  --accent: #1c5fb0;
  --focus-ring: #1c5fb0;
  --neck-string-bg: #fff;
  --neck-string-line: #cbcbcb;
  --neck-fret-line: #7b7b7b;
  --note-bg: #616161;
  --note-text: #fff;
  --note-hidden-bg: #e0e0e0;
  --note-hidden-text: #4a4a4a;
  --note-tonic-bg: #c0392b;
  --note-tonic-text: #fff;
  --note-tune-bg: #5c5c5c;
  --note-tune-text: #fff;
}

html.dark {
  --app-bg: #141414;
  --app-text: #e5eaf3;
  --app-text-muted: #a3a6ad;
  --accent: #2f6fb5;
  --focus-ring: #79bbff;
  --neck-string-bg: #1d1e1f;
  --neck-string-line: #4c4d4f;
  --neck-fret-line: #6b6b6b;
  --note-bg: #a3a6ad;
  --note-text: #141414;
  --note-hidden-bg: #3a3a3a;
  --note-hidden-text: #c0c4cc;
  --note-tonic-bg: #ff8a7a;
  --note-tonic-text: #3a1a16;
  --note-tune-bg: #6b6b6b;
  --note-tune-text: #141414;
}

html,
body {
  min-height: 100%;
}

body {
  color: var(--app-text);
  background-color: var(--app-bg);
}

#app {
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--app-text);
  background-color: var(--app-bg);
  padding: 0 12px;
}

:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
</style>
