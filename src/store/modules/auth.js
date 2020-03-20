
import axios from "axios";

const state = {
    token: localStorage.getItem("user-token") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
};

const actions = {
    AuthRequest: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit('AuthRequest');
            axios.post("user/login", user)
                .then(resp => {
                    localStorage.setItem("user-token", resp.data.access_token);
                    // Here set the header of your ajax library to the token value.
                    const token = resp.data.access_token;
                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
                    commit('AuthSuccess', resp);
                    dispatch('UserRequest');
                    resolve(resp);
                })
                .catch(err => {
                    commit('AuthError', err);
                    localStorage.removeItem("user-token");
                    reject(err);
                });
        });
    },
    AuthLogout: ({ commit }) => {
        return new Promise(resolve => {
            commit('AuthLogout');
            localStorage.removeItem("user-token");
            resolve();
        });
    }
};

const mutations = {
    AuthRequest: state => {
        state.status = "loading";
    },
    AuthSuccess: (state, resp) => {
        state.status = "success";
        state.token = resp.data.access_token;
        state.hasLoadedOnce = true;
    },
    AuthError: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    AuthLogout: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
