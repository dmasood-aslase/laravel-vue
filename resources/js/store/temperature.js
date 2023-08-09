import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const temperatureStore = new Vuex.Store({
  state: {
    degree: "0",
    windSpeed: "0",
  },
  mutations: {
    setDegree (state, provided) {
      state.degree = provided;
    },
    setWindSpeed (state, provided) {
      state.windSpeed = provided;
    }
  }
})

export default temperatureStore;
