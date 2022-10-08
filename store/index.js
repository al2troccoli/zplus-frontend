import Vuex from 'vuex'
import animals from './modules/animals'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      animals,
    }
  })
}

export default createStore
