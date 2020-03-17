import axios from 'axios';

const state = {
    user: {
        name: '',
        id: '',
        role_id: '',
    },
    userToken:  localStorage.getItem('user_token') || null,
};
const getters = {
    userToken: (state) => state.userToken,
    userUser: (state) => state.user
};
const actions = {
    async login({ commit } , form){
        const response = await axios.post('http://127.0.0.1:8001/api/user/login', {
            email: form.email,
            password: form.password,
        });
        commit('setUserAndToken', response.data);
    },
    async getAuthUser({ commit }){

        const response = await axios.get('http://127.0.0.1:8001/api/auth-user', {
            headers: {
                'Authorization': `Bearer ${state.userToken}`
            }
        }).catch(err => {
            if (err.response.status === 401){
                console.log(err);
            }
        });


        commit('setUser', response.data);
    },
    async clearToken({ commit }){
        const deleteToken = '';
        commit('clearToken' , deleteToken);
    }

};
const mutations = {
    setUserAndToken: (state , data)  => {
        state.user = data.user;
        state.userToken = data.access_token;
        localStorage.setItem('user_token' , data.access_token)
    },
    setUser: (state , data)  => {
        if (data !== undefined){
            state.user = data.user;
        }else{
            state.user.name = 'Login'
        }

    },
    clearToken: (state , deleteToken)  => {
        state.userToken = deleteToken;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
