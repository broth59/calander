import Vuex from "vuex"
import Vue from "vue"
import { CalanderAPI } from "@/third-parties/axios"

import { Action, Mutation } from "./type"

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: {
        refinedDates: [],
        startDate: "",
        endDate: ""
    },

    getters:{
        
    },
    
    actions: {
        [Action.FetchRefinedDates]: function({state, commit}){
            return CalanderAPI.get(`startDate:${state.startDate}/endDate:${state.endDate}`)
                              .then(res=>commit(Mutation.FetchRefinedDates, res.data))
        }
    },

    mutations: {
        [Mutation.FetchRefinedDates]: function(state, refinedDates){
            state.refinedDates = refinedDates
        }
    }
    
})