import Vue from 'vue'

const mixins = {
  methods: {
    /**
     * @description Navigates to Animal List view
     */
    navigateToAnimalListView() {
      this.$router.push(this.localeLocation({ path: '/animals'}))
    },

    /**
     * @description Navigates to Animal Creation view
     */
    navigateToAnimalCreationView() {
      this.$router.push(this.localeLocation({ path: '/animals/new-animal'}))
    },

    /**
     * @description Navigates to Animal Detail view
     * @param {string} animalId - The animal identification will be sent to the url as a parameter
     */
    navigateToAnimalDetailsPage(animalId) {
      this.$router.push(this.localeLocation({ path: `/animals/${animalId}`}))
    },

    /**
     * @description Formats a given date with the app selected locale.
     * @param {string} stringDate - Visited animal property
     * @return {string}
     */
    formatDateWithLocale(stringDate) {
      return this.formatDateByLocale(stringDate, this.$i18n.locale)
    }
  },

  computed: {
  }
}

Vue.mixin(mixins)

