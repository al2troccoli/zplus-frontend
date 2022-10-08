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
                  v-model="animalsFormModel.id"
                  :label="$t('commons.id')"
                  readonly
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
                  v-model="animalsFormModel.id"
                  :label="$t('commons.lastVisit')"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col v-if="!creationMode" sm="12">
                <!-- Last Update -->
                <v-text-field
                  v-model="animalsFormModel.id"
                  :label="$t('commons.lastUpdate')"
                  readonly
                ></v-text-field>
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
          @click.prevent="listStudentsHandler">
          <v-icon left dark> mdi-check </v-icon>
          {{ $t('animalCreation.createAnimal')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import { animalsMixins } from './animals-mixins'

export default {
  name: 'ZplusAnimalsForm',

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
        id: null,
        name: '',
        type: '',
        breed: '',
        gender: '',
        vaccinated: false
      },
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
    }
  },

  methods: {
    async submitNewAnimal () {

    },

    /**
     * @description Navigates to Animal List view
     */
    navigateToAnimalListView() {
      this.$router.push(this.localeLocation({ path: '/animals'}))
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
