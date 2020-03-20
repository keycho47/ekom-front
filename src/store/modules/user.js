import Vue from "vue";

import axios from "axios";


const state = { status: "", profile: {} };

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    UserRequest: ({ commit, dispatch }) => {
        commit('UserRequest');
        const token = localStorage.getItem('user-token');
        axios.get("auth-user",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                commit('UserSuccess', resp.data.user);
            })
            .catch(() => {
                commit('UserError');
                // if resp is unauthorized, logout, to
                dispatch('AuthLogout');
            });
    }
};

const mutations = {
    UserRequest: state => {
        state.status = "loading";
    },
    UserSuccess: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp);
    },
    UserError: state => {
        state.status = "error";
    },
    AuthLogout: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
