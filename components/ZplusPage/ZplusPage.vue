<template>
  <v-container
    :class="['zplus-page', setSmallClass]"
    justify="center"
    align="center">
    <div class='mb-4'>
      <h1>{{ pageName }}</h1>
    </div>
    <v-sheet
      class="zplus-page__sheet"
      elevation="1"
      :rounded="true">
      <slot name="sheetContent" />
    </v-sheet>
  </v-container>
</template>

<script>
/**
 * @description Zplus Page
 * Component used for the common layout of every app page.
 * @author Aldo Troccoli <al2troccoli@gmail.com>
 * @module ZplusPage
 * @category Components
 *
 * @vue-prop {string} pageName - Allows to set an h1 title page
 * @vue-prop {boolean} small - Set to true the page is set with 600 px of max-width
 * @vue-computed {object} setSmallClass - Set the zplus-page--small css class to the main container
 */
export default {
  name: 'ZplusPage',

  props: {
    pageName: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    setSmallClass() {
      return { 'zplus-page--small': this.small }
    }
  }
}
</script>

<style lang='scss' scoped>
.zplus-page {
  width: 100%;
  max-width: rem(1280);

  &__sheet {
    padding: rem(32);
    background: var(--colorGreyLight);
    @include glossyStyle(10%);
  }

  &--small {
    max-width: rem(600);
  }
}
</style>
