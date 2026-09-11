<template>
  <section :class="$style['home-page']">
    <header>
      <h1 :class="$style['home-page-title']">Музыкальные утилиты</h1>
      <p :class="$style['home-page-description']">
        Набор инструментов для музыкантов: визуализация гамм на грифе и другие помощники.
      </p>
    </header>

    <div :class="$style['home-page-utilities']">
      <ElCard shadow="hover">
        <h2 :class="$style['utility-card-title']">Визуализатор гамм</h2>
        <p :class="$style['utility-card-text']">Показывает ноты выбранной гаммы на грифе струнного инструмента.</p>
        <RouterLink
          :to="FRETBOARD_SCALES_URL"
          :class="$style['utility-card-action']">
          Открыть
        </RouterLink>
      </ElCard>

      <ElCard
        :class="$style['utility-card-disabled']"
        shadow="never">
        <h2 :class="$style['utility-card-title']">
          Метроном
          <ElTag
            :class="$style['utility-card-badge']"
            type="info"
            size="small">
            скоро
          </ElTag>
        </h2>
        <p :class="$style['utility-card-text']">Метроном с генерацией ритмических рисунков. Утилита в разработке.</p>
        <ElButton
          type="primary"
          disabled>
          Скоро
        </ElButton>
      </ElCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { FRETBOARD_SCALES_URL } from '@/widgets/FretboardScalesControls/consts';

useTitle('Музыкальные утилиты');
</script>

<style lang="less" module>
.home-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
}

.home-page-title {
  margin-bottom: 8px;
  font-size: 32px;
}

.home-page-description {
  margin-bottom: 24px;
  color: #606266;
}

.home-page-utilities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.utility-card-title {
  margin-bottom: 8px;
  font-size: 20px;
}

.utility-card-text {
  margin-bottom: 16px;
  color: #606266;
}

.utility-card-action {
  display: inline-block;
  padding: 8px 16px;
  color: #fff;
  background-color: #409eff;
  border-radius: 4px;
  text-decoration: none;
}

.utility-card-disabled {
  opacity: 0.6;
}

.utility-card-badge {
  margin-left: 8px;
}
</style>
