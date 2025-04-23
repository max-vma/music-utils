<template>
  <div :class="$style['neck-fret']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" module>
.neck-fret {
  flex: 4;
  position: relative;
  &:last-child {
    flex: 2;
  }

  &:first-child {
    flex: 2;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    height: 100%;
    width: 5px;
    background-color: #7b7b7b;
    border-radius: 2px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    z-index: 1;
    height: 3px;
    width: 100%;
    background-color: #cbcbcb;
  }
}
</style>
