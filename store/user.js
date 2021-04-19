import { Auth } from "aws-amplify"

export const state = () => ({
  user: null,
  loggedIn: false,
  token: null,
  id: null,
  contactId: null
})

export const mutations = {
  setUser(state, newUser) {
    state.user = newUser
  },
  setToken(state, token) {
    state.token = token
  },
  setUserId(state, id) {
    state.id = id
  },
  updateContactId(state, id) {
    state.contactId = id
  },
}

export const actions = {
  async login({ dispatch, commit }) {
    const user = await dispatch("amplifySignIn")
    commit("setUser", Object.assign({}, user))
    commit("setToken", user.signInUserSession.idToken.jwtToken)
  },
  async logout({ commit }) {
    commit("setUser", null)
    commit("setToken", null)
    commit("setUserId", null)
    await Auth.signOut()
  },
  amplifySignIn() {
    return Auth.signIn("rui.martins@sellwerk.de", "Welcome12!")
  },
  async loadInitialData({ dispatch }) {
    await dispatch("productVariants/initProductVariants", null, { root: true })
  },
  setContactId({ commit }, id) {
    commit("updateContactId", id)
  },
}
