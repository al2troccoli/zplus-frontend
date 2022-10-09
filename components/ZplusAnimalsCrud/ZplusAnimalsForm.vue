<template>
  <div>
    <v-card>
      <v-card-text>
        <v-form ref="animalsForm">
          <v-container>
            <v-row>
              <v-col v-if="!creationMode" sm="12">
                <!-- Animal ID -->
                <v-text-field
                  v-model="animalsFormModel._id"
                  :label="$t('commons.id')"
                  readonly
                  disabled
                ></v-text-field>
              </v-col>
              <v-col sm="12" >
                <!-- Animal Name -->
                <v-text-field
                  v-model="animalsFormModel.name"
                  :rules="[() => !!animalsFormModel.name || $t('commons.required')]"
                  counter
                  maxlength="50"
                  :label="$t('commons.name')"
                ></v-text-field>
              </v-col>
              <v-col sm="12" >
                <!-- Animal Type -->
                <v-select
                  v-model="animalsFormModel.type"
                  :rules="[() => !!animalsFormModel.type || $t('commons.required')]"
                  :items="getAnimalsTypeItems"
                  :label="$t('commons.animalsType')"
                  item-value="value"
                  :item-text="item => $t(item.label)"
                  outlined/>
              </v-col>
              <v-col sm="12" >
                <!-- Animal Breed -->
                <v-text-field
                  v-model="animalsFormModel.breed"
                  :rules="[() => !!animalsFormModel.breed || $t('commons.required')]"
                  counter
                  maxlength="100"
                  :label="$t('commons.breed')"
                ></v-text-field>
              </v-col>
              <v-col sm="12" >
                <!-- Animal Gender -->
                <v-select
                  v-model="animalsFormModel.gender"
                  :rules="[() => !!animalsFormModel.gender || $t('commons.required')]"
                  :items="getAnimalsGenderItems"
                  :label="$t('commons.gender')"
                  item-value="value"
                  :item-text="item => $t(item.label)"
                  outlined/>
              </v-col>
              <v-col sm="12" >
                <!-- Vaccinated -->
                <v-checkbox
                  v-model="animalsFormModel.vaccinated"
                  :label="$t('commons.vaccinated')"
                ></v-checkbox>
              </v-col>
              <v-col v-if="!creationMode" sm="12">
                <!-- Last Visit -->
                <v-text-field
                  :value="formatDateWithLocale(animalsFormModel.lastVisit)"
                  :label="$t('commons.lastVisit')"
                  readonly
                  disabled
                />
              </v-col>
              <v-col v-if="!creationMode" sm="12">
                <!-- Last Update -->
                <v-text-field
                  :value="formatDateWithLocale(animalsFormModel.lastUpdate)"
                  :label="$t('commons.lastUpdate')"
                  readonly
                  disabled
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Refresh button  -->
        <v-btn
          color="primary"
          class="mr-4"
          outlined
          @click.prevent="navigateToAnimalListView">
          <v-icon left dark> mdi-arrow-left </v-icon>
          {{ $t('actions.back')}}
        </v-btn>
        <!-- Refresh button  -->
        <v-btn
          color="secondary"
          class="mr-4"
          @click.prevent="actionButtonHandler">
          <v-icon left dark> mdi-check </v-icon>
          {{ getMainButtonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <loading-overlay
      :loading="pageIsLoading"
      :loading-text="getLoadingPageMessage"
    />
  </div>

</template>

<script>
/**
 * @description Zplus Animals Form
 * Displays a form for create animals or edit the existing ones.
 * @author Aldo Troccoli <al2troccoli@gmail.com>
 * @module ZplusAnimalsForm
 * @category Components
 *
 * @vue-prop {boolean} creationMode - True if the form is in creation mode
 * @vue-data {object} animalsFormModel - V model of the form
 * @vue-data {string} selectedAnimalId - The animal id retrieved from url param
 * @vue-data {boolean} pageIsLoading - True if the page is loading
 * @vue-computed {string} getMainButtonLabel - Returns the translation label of the main button, depending on creationMode
 */

import { animalsMixins } from './animals-mixins'
import { ZPLUS_ERRORS } from '~/utils/constants'
import LoadingOverlay from '~/components/LoadingOverlay/LoadingOverlay'

export default {

  name: 'ZplusAnimalsForm',

  components: { LoadingOverlay },

  mixins: [animalsMixins],

  props: {
    creationMode: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      animalsFormModel: {
        _id: null,
        name: '',
        type: '',
        breed: '',
        gender: '',
        vaccinated: false,
        lastVisit: null,
        lastUpdate: null,
      },
      selectedAnimalId: null,
      pageIsLoading: false,
    }
  },

  computed: {
    getMainButtonLabel() {
      return this.creationMode
        ? this.$t('animalCreation.createAnimal')
        : this.$t('animalDetails.editAnimal')
    },

    getLoadingPageMessage() {
      return this.creationMode
        ? this.$t('animalCreation.creatingAnimal')
        : this.$t('animalDetails.editingAnimal')
    }
  },

  async created() {
    await this.initAnimalsFormView()
  },

  methods: {
    /**
     * @async
     * @description Handler of the main button (Edit or Create)
     * @return {Promise<void>}
     */
    async actionButtonHandler() {
      const actionFunction = this.creationMode
        ? this.submitNewAnimal
        : this.editCurrentAnimal
      await actionFunction()
    },

    /**
     * @async
     * @description Submits the new Animal object created.
     * @return {Promise<void>}
     */
    async submitNewAnimal () {
      if (this.validateForm()) {
        try {
          this.pageIsLoading = true
          const newAnimal = {...this.animalsFormModel}
          delete(newAnimal._id)
          await this.$store.dispatch('submitNewAnimal', newAnimal)
          await this.$store.dispatch('showSuccessAlert', 'animalCreation.createdSuccessfully')
          this.resetForm()
        } catch (error) {
          await this.$store.dispatch('showErrorAlert', 'error.wrong')
        } finally {
          this.pageIsLoading = false
        }
      }
    },

    /**
     * @async
     * @description Submits to the server an existing Animal object that have been modified.
     * @return {Promise<void>}
     */
    async editCurrentAnimal () {
      if (this.validateForm()) {
        try {
          this.pageIsLoading = true
          const animal = {...this.animalsFormModel}
          await this.$store.dispatch('editAnimal', animal)
          await this.$store.dispatch('showSuccessAlert', 'animalDetails.editedSuccessfully')
        } catch (error) {
          await this.$store.dispatch('showErrorAlert', 'error.wrong')
        } finally {
          this.pageIsLoading = false
        }
      }
    },

    /**
     * @description Calls the validate function of the v-form component
     * @return {boolean} - Returns true if the form is valid.
     */
    validateForm() {
      return this.$refs.animalsForm.validate()
    },

    /**
     * @description Clear all the form fields
     */
    resetForm() {
      this.$refs.animalsForm.reset()
    },

    /**
     * @async
     * @description Retrieves the details of an existing animal by its id
     * @param {string} animalId
     * @throws ZPLUS_ERRORS.NO_ANIMAL_ID
     */
    async retrieveAnimalInfoById(animalId) {
      if (!animalId) throw ZPLUS_ERRORS.NO_ANIMAL_ID
      if (this.$store.getters.getAnimalsList?.length <= 0) {
        await this.$store.dispatch('retrieveAnimals', animalId)
      }
      const animalDetails = this.$store.getters.getAnimalInfoById(animalId)
      this.animalsFormModel = animalDetails
    },

    /**
     * @async
     * @description Initializes the animal form depending on view mode: Creation or Modification
     * @return {Promise<void>}
     */
    async initAnimalsFormView() {
      if (this.creationMode) {
        this.selectedAnimalId = null
      } else {
        try {
          this.selectedAnimalId = this.$route.params.id
          await this.retrieveAnimalInfoById(this.selectedAnimalId)
        } catch (error) {
          if (error === ZPLUS_ERRORS.NO_ANIMAL_ID) {
            await this.$store.dispatch('showErrorAlert', 'error.noAnimalInfo')
          } else {
            await this.$store.dispatch('showErrorAlert', 'error.wrong')
          }
        }
      }
    },
  }
}
</script>

