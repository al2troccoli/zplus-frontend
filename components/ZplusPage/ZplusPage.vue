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
