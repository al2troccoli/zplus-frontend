<template>
  <div>
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="getAnimalsList"
          :items-per-page="10"
          :loading="tableIsLoading"
          :loading-text="$t('animalsList.loadingAnimals')"
          class="elevation-0 zplus-table">
          <!-- Type -->
          <template v-slot:[`item.type`]="{ item }">
            <v-icon
              :title="$t(translateAnimalType(item.type))"
              class="ml-2"
              color="orange darken-2">
              {{ getAnimalIconByType(item.type) }}
            </v-icon>
          </template>
          <!-- Gender -->
          <template v-slot:[`item.gender`]="{ item }">
            <v-icon
              :title="$t(translateAnimalGender(item.gender))"
              class="ml-2">
              {{ getGenderIconByGenderType(item.gender) }}
            </v-icon>
          </template>
          <!-- Vaccinated -->
          <template v-slot:[`item.vaccinated`]="{ item }">
            <v-icon
              class="ml-2"
              :color="getVaccinatedIcon(item.vaccinated).color">
              {{ getVaccinatedIcon(item.vaccinated).icon }}
            </v-icon>
          </template>
          <!-- Visited Date -->
          <template v-slot:[`item.lastVisit`]="{ item }">
            {{ getVisitedDateByLocale(item.lastVisit) }}
          </template>
          <!-- Actions -->
          <template v-slot:[`item.actions`]="{ item }">
            <!-- Edit button -->
            <v-icon
              :title="$t('animalsList.editAnimal')"
              class="ml-2"
              @click="navigateToAnimalDetailsPage(item.id)">
              mdi-pencil-outline
            </v-icon>
            <!-- Delete button -->
            <v-icon
              :title="$t('animalsList.deleteAnimal')"
              class="ml-2"
              color="red darken-2"
              @click="openDeleteDialogHandler(item)">
              mdi-delete-outline
            </v-icon>
          </template>
          <!-- TOP -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title> {{ $t('animalsList.registeredAnimals')}} </v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Refresh button  -->
        <v-btn
          color="primary"
          class="mr-4"
          outlined
          @click.prevent="refreshAnimalsListHandler()">
          <v-icon left dark> mdi-refresh </v-icon>
          {{ $t('actions.refresh')}}
        </v-btn>
        <!-- Create new animal button  -->
        <v-btn
          color="secondary"
          @click.prevent="navigateToAnimalCreationView()">
          <v-icon left dark> mdi-plus-thick </v-icon>
          {{ $t('animalsList.createAnimal')}}
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Delete animal dialog  -->
    <v-dialog
      v-model="deleteDialogVisible"
      persistent
      width="500">
      <v-card>
        <v-card-title class="text-h5 green lighten-3">
          {{$t('commons.attention')}}
        </v-card-title>
        <v-card-text class="justify-center d-flex flex-column">
          <img
            src="/cat-throwing-a-vase-animate.svg"
            class="mt-4"
            alt="Cat throwing a vase"
            height='180'
            width='auto'/>
          <p class="text-subtitle-1 mt-4 text-center">
            {{$t('animalsList.deleteAnimalConfirmationText', {animalType: $t(translateAnimalType(clickedAnimal.type)).toLowerCase(), animalName: clickedAnimal.name })}}
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Dialog Cancel  -->
          <v-btn
            color="primary"
            outlined
            @click.prevent="deleteDialogVisible = false">
            <v-icon left dark> mdi-close </v-icon>
            {{$t('actions.cancel')}}
          </v-btn>
          <!-- Dialog Delete  -->
          <v-btn
            color="secondary"
            @click.prevent="deleteAnimalHandler">
            <v-icon left dark> mdi-delete-outline </v-icon>
            {{$t('animalsList.deleteAnimalType', {animalType: $t(translateAnimalType(clickedAnimal.type)).toLowerCase()})}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <loading-overlay
      :loading="deletingAnimal"
      :loading-text="$t('animalsList.deletingAnimal')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { animalsMixins } from './animals-mixins'
import LoadingOverlay from '~/components/LoadingOverlay/LoadingOverlay'
export default {
  name: 'ZplusAnimalsTable',
  components: { LoadingOverlay },
  mixins: [animalsMixins],

  data() {
    return {
      headers: [
        { text: this.$t('commons.name') , value: 'name', sortable: true },
        { text: this.$t('commons.type') , value: 'type', sortable: true },
        { text: this.$t('commons.gender'), value: 'gender', sortable: true },
        { text: this.$t('commons.vaccinated'), value: 'vaccinated', sortable: true },
        { text: this.$t('commons.lastVisit'), value: 'lastVisit', sortable: true },
        { text: this.$t('commons.actions'), value: 'actions', sortable: false },
      ],
      newAnimal: {
        id: null,
        name: '',
        type: '',
        breed: '',
        gender: '',
        vaccinated: false,
        lastVisit: null,
        lastUpdate: null,
      },
      tableIsLoading: false,
      deleteDialogVisible: false,
      clickedAnimal: {},
      deletingAnimal: false
    }
  },

  computed: {
    ...mapGetters(['getAnimalsList']),

    // getStudentsDataFormatted() {
    //   return [
    //     {
    //       id: 1,
    //       name: 'Polly',
    //       type: 'Parrot',
    //       breed: '',
    //       gender: 'Female',
    //       vaccinated: false,
    //       lastVisit: null,
    //       lastUpdate: null,
    //     },
    //     {
    //       id: 2,
    //       name: 'Spot',
    //       type: 'Cat',
    //       breed: '',
    //       gender: 'Male',
    //       vaccinated: true,
    //       lastVisit: null,
    //       lastUpdate: null,
    //     },
    //     {
    //       id: 3,
    //       name: 'Spot',
    //       type: 'Cat',
    //       breed: '',
    //       gender: 'Male',
    //       vaccinated: true,
    //       lastVisit: null,
    //       lastUpdate: null,
    //     },
    //     {
    //       id: 4,
    //       name: 'Spot',
    //       type: 'Cat',
    //       breed: '',
    //       gender: 'Male',
    //       vaccinated: true,
    //       lastVisit: null,
    //       lastUpdate: null,
    //     }
    //   ]
    // }
  },

  async created() {
    await this.retrieveAnimalsList()
  },

  methods: {
    /**
     * @async
     * @description Retrieves the animals list via API.
     * @return {Promise<void>}
     */
    async retrieveAnimalsList() {
      try {
        this.tableIsLoading = true
        await this.$store.dispatch('retrieveAnimals', {page: 0, itemsPerPage: 2})
      } catch (error) {
        console.error(error)
      } finally {
        this.tableIsLoading = false
      }
    },

    /**
     * @async
     * @description Refresh button handler. Retrieves the animals list.
     * @return {Promise<void>}
     */
    async refreshAnimalsListHandler() {
      await this.retrieveAnimalsList()
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
     * @param {string} visitedDate - Visited animal property
     * @return {string}
     */
    getVisitedDateByLocale(visitedDate) {
      return this.formatDateByLocale(visitedDate, this.$i18n.locale)
    },

    /**
     * @description Delete animal button handler. Opens the delete dialog
     * @param {object} animalInfo - Animal entity info
     */
    openDeleteDialogHandler(animalInfo) {
      this.deleteDialogVisible = true
      this.clickedAnimal = animalInfo
    },

    async deleteAnimalHandler() {
      try {
        this.deleteDialogVisible = false
        this.deletingAnimal = true
        await this.$store.dispatch('deleteAnimal', this.clickedAnimal.id)
        await this.retrieveAnimalsList()
      } catch (error) {
        console.error(error)
      } finally {
        this.deletingAnimal = false
      }
    }
  },

}
</script>
