/**
 * App通用配置
 */
const state = {
    index : 0
}
const actions = {
    changeIndex({ commit }, n){
        commit("INDEX", n)
    },
}
const getters = {
    index: state => state.index
}
const mutations = {
    ["INDEX"](state, n) {
        state.index = n;
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}