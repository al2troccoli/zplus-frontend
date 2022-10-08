<template>
  <v-overlay :value="loading" class="loading-overlay">
    <div class="loading-overlay__container">
      <v-progress-circular
        indeterminate
        size="56"
        color="green lighten-3"
      />
      <span class="text-subtitle-1 mt-2"> {{ loadingText }} </span>
    </div>
  </v-overlay>
</template>

<script>

export default {
  name: 'LoadingOverlay',

  props: {
    loadingText: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
.loading-overlay {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: rem(300);
  }
}
</style>
