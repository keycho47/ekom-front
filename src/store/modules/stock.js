
const state = {
    client_id: '',
    product_id: '',
    entity_id: '',
};
const getters = {
    client_id: (state) => state.client_id,
    product_id: (state) => state.product_id,
    entity_id: (state) => state.entity_id,
};
const actions = {
    async setClientId({commit} , id){
        commit('changeClientId' , id)
    },
    async setProductId({commit} , id){
        commit('changeProductId' , id)
    },
    async setEntityId({commit} , id){
        commit('changeEntityId' , id)
    },


};
const mutations = {
    changeClientId: (state , id)  => (state.client_id = id),
    changeProductId: (state , id)  => (state.product_id = id),
    changeEntityId: (state , id)  => (state.entity_id = id)
};

export default {
    state,
    getters,
    actions,
    mutations
}
