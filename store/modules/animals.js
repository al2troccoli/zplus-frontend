const state = {
  animalsList: [],
  animalsListPage: 0,
  selectedAnimalId: null
}

const getters = {
  getAnimalsList(state) {
    return state.animalsList
  },
  getAnimalsListPage(state) {
    return state.animalsListPage
  },
  getSelectedAnimalId(state) {
    return state.selectedAnimalId
  },
}


const actions = {
  async retrieveAnimals({ state, commit, getters }, { page = 0, itemsPerPage = 10 }) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const data = [{id:1,name:"Polly",type:"bird",breed:"cotorra",gender:"female",vaccinated:!1,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"},{id:2,name:"Spot",type:"cat",breed:"abisinio",gender:"male",vaccinated:!0,lastVisit:null,lastUpdate:"2021-01-28T04:03:02.216Z"},{id:3,name:"Colombo",type:"dog",breed:"galgo",gender:"male",vaccinated:!0,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"},{id:4,name:"Dorothy",type:"fish",breed:"goldfish",gender:"female",vaccinated:!1,lastVisit:null,lastUpdate:"2021-01-28T04:03:02.216Z"},{id:5,name:"Raymond",type:"rodent",breed:"hamster",gender:"male",vaccinated:!0,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"}]
    commit('SET_ANIMALS_LIST', data)
    return state.animalsList
  },

  async deleteAnimal({ state, commit, getters }, animalId) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const data = [{id:1,name:"Polly",type:"bird",breed:"cotorra",gender:"female",vaccinated:!1,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"},{id:2,name:"Spot",type:"cat",breed:"abisinio",gender:"male",vaccinated:!0,lastVisit:null,lastUpdate:"2021-01-28T04:03:02.216Z"},{id:3,name:"Colombo",type:"dog",breed:"galgo",gender:"male",vaccinated:!0,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"},{id:4,name:"Dorothy",type:"fish",breed:"goldfish",gender:"female",vaccinated:!1,lastVisit:null,lastUpdate:"2021-01-28T04:03:02.216Z"},{id:5,name:"Raymond",type:"rodent",breed:"hamster",gender:"male",vaccinated:!0,lastVisit:"2021-01-28T04:03:02.216Z",lastUpdate:"2021-01-28T04:03:02.216Z"}]
    commit('SET_ANIMALS_LIST', data)
    return state.animalsList
  }
}

const mutations = {
  SET_ANIMALS_LIST(state, list) {
    state.animalsList = list
  },
  SET_SELECTED_ANIMAL_ID(state, id) {
    state.selectedAnimalId = id
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
