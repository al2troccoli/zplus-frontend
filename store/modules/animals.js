/**
 * @name Animals State
 * @type {object}
 * @property {array} [animalsList=[]] - List of created animals
 */
const state = {
  animalsList: [],
}

/**
 * @name Animals Getters
 * @getter {array} getAnimalsList=animalsList - Returns the list of retrieved animals
 * @getter {object} getAnimalInfoById=animalsList - Find an animal inside animalList state,  with the id passed as parameter
 */
const getters = {
  getAnimalsList(state) {
    return state.animalsList
  },
  getAnimalInfoById: (state) => (animalId) => {
    return state.animalsList.find(animal => animal._id === animalId)
  }
}


const actions = {
  /**
   * @async
   * @description Retrieve all the animals available in the system.
   * @name retrieveAnimals
   * @action retrieveAnimals=animalsList
   * @returns {array} - The animals list
   */
  async retrieveAnimals({ state, commit }) {
    const animalsList = await this.$axios.get('/animals/')
    commit('SET_ANIMALS_LIST', animalsList.data)
    return state.animalsList
  },

  /**
   * @async
   * @description Submits a new animal to the API.
   * @name submitNewAnimal
   * @param {object} animalItem - The new animal object
   * @return {object} - The new animal submitted with its assigned id.
   */
  async submitNewAnimal({ _ }, animalItem) {
    return await this.$axios.post('/animals/new-animal', animalItem)
  },

  /**
   * @async
   * @description Modifies an existing animal via API
   * @name editAnimal
   * @action editAnimal=animalsList
   * @param {object} animalItem - The modified animal object
   * @return {object} - The modified animal.
   */
  async editAnimal({ commit }, animalItem) {
    const editedAnimal = await this.$axios.put('/animals/update-animal', animalItem)
    commit('UPDATE_EDITED_ANIMAL', editedAnimal)
    return editedAnimal
  },

  /**
   * @async
   * @description Deletes an existing animal via API
   * @name deleteAnimal
   * @action deleteAnimal=animalsList
   * @param {string} animalId - The animal id
   * @return {void}
   */
  async deleteAnimal({ state, commit, getters }, animalId) {
    return await this.$axios.delete(`/animals/${animalId}`)
  },


  /**
   * @async
   * @description Retrieve the info of the animal selected
   * @name retrieveAnimalById
   * @param {string} animalId - The animal id
   * @returns {object} - Info of the animal retrieved
   */
  async retrieveAnimalById({ _ }, animalId) {
    return await this.$axios.get(`/animals/${animalId}`)
  }
}
/**
 * @name Animals Mutators
 * @type {object}
 * @mutator SET_ANIMALS_LIST=animalsList
 * @mutator UPDATE_EDITED_ANIMAL=animalsList
 */
const mutations = {
  SET_ANIMALS_LIST(state, list) {
    state.animalsList = list
  },
  UPDATE_EDITED_ANIMAL(state, editedAnimal) {
    let findAnimal = state.animalsList.find(animal => animal._id === editedAnimal._id)
    if (findAnimal) {
      findAnimal = { ...editedAnimal }
    }
    state.animalsList = [...state.animalsList]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
