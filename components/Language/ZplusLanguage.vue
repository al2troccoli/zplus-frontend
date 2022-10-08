<template>
  <div class="zplus-language">
    <nuxt-link
      v-for="locale in availableLocales"
      :class="[selectedLanguage(locale.code), 'zplus-language__item']"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ZplusLanguage',

  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },

  methods: {
    selectedLanguage(locale) {
      return {
        'zplus-language--selected': locale === this.$i18n.locale
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.zplus-language {
  $self: &;
  padding: var(--spacingSmall) var(--spacingMedium);

  &__item {
    text-decoration: none;
    margin-right: var(--spacingMedium);
    color: var(--colorGreyMid);

    &:link,
    &:active {
      color: var(--colorGreyMid);
      opacity: 0.45;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  &--selected {
    &.nuxt-link-active {
      opacity: 1;
      color: var(--colorPrimaryDark);
      &:link,
      &:active {
        color: var(--colorPrimaryDark);
      }
    }
  }
}
</style>
