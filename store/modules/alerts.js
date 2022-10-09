const state = {
  alertIsVisible: false,
  alertMessage: '',
  alertType: 'success',
  alertColor: ''
}

const getters = {
  getAlertIsVisible(state) {
    return state.alertIsVisible
  },
  getAlertMessage(state) {
    return state.alertMessage
  },
  getAlertType(state) {
    return state.alertType
  },
  getAlertColor(state) {
    return state.alertColor
  }
}


const actions = {
  showSuccessAlert({ commit }, message) {
    commit('SET_ALERT_MESSAGE', message)
    commit('SET_ALERT_TYPE', 'success')
    commit('SET_ALERT_COLOR', 'green darken-2')
    commit('SHOW_ALERT')
  },

  showErrorAlert({ commit, dispatch }, message) {
    commit('SET_ALERT_MESSAGE', message)
    commit('SET_ALERT_TYPE', 'error')
    commit('SET_ALERT_COLOR', 'red darken-2')
    commit('SHOW_ALERT')
  },

  hideAlert({ commit }, message) {
    commit('SET_ALERT_MESSAGE', '')
    commit('HIDE_ALERT')
  },
}


const mutations = {
  SHOW_ALERT(state) {
    state.alertIsVisible = true
  },
  HIDE_ALERT(state) {
    state.alertIsVisible = false
  },
  SET_ALERT_MESSAGE(state, alertMessage = '') {
    state.alertMessage = alertMessage
  },
  SET_ALERT_TYPE(state, alertType = '') {
    state.alertType = alertType
  },
  SET_ALERT_COLOR(state, color) {
    state.alertColor = color
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
