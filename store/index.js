import Vuex from 'vuex'
import animals from './modules/animals'
import alerts from './modules/alerts'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      animals,
      alerts,
    }
  })
}

export default createStore
