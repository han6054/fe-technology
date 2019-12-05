import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hasPermission: false,
        btnPermission: {
            edit: false,
            add: true
        }
    },
    mutations: {

    },
    actions: {

    }
})