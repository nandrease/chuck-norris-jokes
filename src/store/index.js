import Vue from "vue";
import Vuex from "vuex";
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: []
  },
  mutations: {
    ADD_TO_FAVOURITES(state, item) {
      state.favourites.push(item);
    },
    REMOVE_FROM_FAVOURITES(state, id) {
      state.favourites = state.favourites.filter(item => item.id !== id);
    }
  },
  actions: {
    addToFavourites({ commit, state }, joke) {
      const existsInFavourites = state.favourites.find(item => item.id === joke.id);
      if (!existsInFavourites) {
        commit(ADD_TO_FAVOURITES, joke);
      }
    },
    removeFromFavourites({ commit, state }, jokeId) {
      const existsInFavourites = state.favourites.find(item => item.id === jokeId);
      if (existsInFavourites) {
        commit(REMOVE_FROM_FAVOURITES, jokeId);
      }
    }
  },
  modules: {}
});
