import {
  ZPLUS_ANIMALS_TYPES,
  ZPLUS_ANIMALS_GENDER,
  ZPLUS_ANIMALS_GENDER_ICON
} from '~/utils/constants'

// COMPUTED

/**
 * @description Generates the items set used to feed the Animal Types select component
 * @return {{label: string, value: *}[]}
 */
const getAnimalsTypeItems = () => {
  return Object.entries(ZPLUS_ANIMALS_TYPES).map(
    ([key, value]) => {
      return {value, label: `animalsTypes.${value.toLowerCase()}`}
    }
  )
}

/**
 * @description Generates the items set used to feed the Animal Gender select component
 * @return {{label: string, value: *}[]}
 */
const getAnimalsGenderItems = () => {
  return Object.entries(ZPLUS_ANIMALS_GENDER).map(
    ([key, value]) => {
      return {value, label: `animalsGender.${value.toLowerCase()}`}
    }
  )
}

// METHODS

const translateAnimalType = (animalType = '') => {
  return animalType.toUpperCase() in ZPLUS_ANIMALS_TYPES
    ? `animalsTypes.${animalType.toLowerCase()}`
    : 'animalsTypes.unknown'
}

const translateAnimalGender = (animalGender = '') => {
  return animalGender.toUpperCase() in ZPLUS_ANIMALS_GENDER
    ? `animalsGender.${animalGender.toLowerCase()}`
    : 'animalsGender.unknown'
}

const getAnimalIconByType = (animalType) => {
  return animalType.toUpperCase() in ZPLUS_ANIMALS_TYPES
    ? `mdi-${animalType.toLowerCase()}`
    : 'mdi-help'
}

const getGenderIconByGenderType = (animalGender) => {
  return animalGender.toUpperCase() in ZPLUS_ANIMALS_GENDER_ICON
    ? `mdi-${ZPLUS_ANIMALS_GENDER_ICON[animalGender.toUpperCase()].toLowerCase()}`
    : 'mdi-help'
}

const getVaccinatedIcon = (isVaccinated) => {
  return isVaccinated
    ? { icon: 'mdi-needle', color: 'green darken-2' }
    : { icon: 'mdi-needle-off', color: 'grey lighten-1' }
}

const formatDateByLocale = (dateInfo, locale = 'en-EN') => {
  if (!dateInfo) return '-'
  const date = new Date(dateInfo)
  return date.toLocaleString(locale)
}

export default {
  methods: {
    translateAnimalType,
    translateAnimalGender,
    getAnimalIconByType,
    getGenderIconByGenderType,
    getVaccinatedIcon,
    formatDateByLocale
  },
  computed: {
    getAnimalsTypeItems,
    getAnimalsGenderItems,
  }
}

