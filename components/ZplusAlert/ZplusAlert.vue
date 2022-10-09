<template>
  <div class="zplus-alert">
    <v-alert
      v-model="alertIsVisible"
      :type="getAlertType"
      :color="getAlertColor"
      dismissible
      class="mt-4 zplus-alert__component">
      {{ $t(getAlertMessage) }}
    </v-alert>
  </div>
</template>

<script>
/**
 * @description Zplus Alert
 * Global Alert component managed with vuex
 * @author Aldo Troccoli <al2troccoli@gmail.com>
 * @module ZplusAlert
 * @category Components
 *
 * @vue-data {boolean} alertIsVisible - True if the alert have to be visible
 */

import { mapGetters } from 'vuex'

export default {
  name: 'ZplusAlert',

  data() {
    return {
      alertIsVisible: false
    }
  },

  computed: {
    ...mapGetters([
      'getAlertIsVisible',
      'getAlertMessage',
      'getAlertType',
      'getAlertColor'
    ])
  },

  watch: {
    getAlertIsVisible (newVal, oldVal) {
      this.alertIsVisible = newVal
    },

    alertIsVisible (newVal, oldVal) {
      if (!newVal && oldVal) {
        this.$store.dispatch('hideAlert')
      }
    },

  }
}
</script>

<style lang='scss' scoped>
.zplus-alert {
  width: 100%;
  display: flex;
  justify-content: center;

  &__component {
    max-width: rem(500);
  }
}
</style>
