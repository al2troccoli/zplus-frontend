<template>
  <v-container
    class="zplus-intro"
    justify="center"
    align="center">
    <img
      src="/dog-paw-animate.svg"
      class="zplus-intro__image"
      alt="Dog paw"
      height='280'
      width='auto'/>
    <h1 class="text-center mt-4">{{ $t('intro.title')}}</h1>
    <p>{{ $t('intro.text')}}</p>
    <v-btn
      color="secondary"
      class="zplus-intro__button text-h5"
      @click.prevent="navigateToAnimalListView">
      {{ $t('actions.start')}}
      <v-icon class="ml-2"> mdi-arrow-right-bold </v-icon>
    </v-btn>
  </v-container>
</template>

<script>

/**
 * @description Zplus Animals Intro
 * Intro page
 * @author Aldo Troccoli <al2troccoli@gmail.com>
 * @module ZplusIntro
 * @category Components
 */

export default {
  name: 'ZplusIntro'
}
</script>

<style lang='scss' scoped>
.zplus-intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  :deep(.v-btn) {
    height: rem(60);
    width: rem(280);
    margin-top: var(--spacingLarge);
  }
}
</style>
