import { Auth } from "aws-amplify"

export const state = () => ({
    user: null,
    loggedIn: false,
    token: null,
    id: null
})

export const mutations = {
    setUser(state, newUser) {
        state.user = newUser
    },
    setToken(state, token){
        state.token = token
    },
    setUserId(state, id){
        state.id = id
    }
}

export const actions = {
    async login({dispatch, commit}) {
        const user = await dispatch('amplifySignIn')
        commit('setUser', Object.assign({}, user))
    },
    async logout({commit}) {
        commit('setUser', null)
        await Auth.signOut()
    },
    amplifySignIn() {
        return Auth.signIn("rui.martins@sellwerk.de", "Welcome12!")
    },
    /* loadCurrentSession() {
        return Auth.currentSession()
    },
    loadAuthToken({dispatch}) {
       return dispatch('loadCurrentSession')
               .then(session => session.idToken.jwtToken)
    }, */
}
