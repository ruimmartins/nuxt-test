import { Auth } from "aws-amplify"

export const state = () => ({
  rendered: false,
})

export const mutations = {
  setServerRendered: (state, rendered) => {
    state.rendered = rendered
  },
}

export const actions = {
  nuxtServerInit({ dispatch, commit }, { req }) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split("; ")
      const idTokenString = cookies.find((cookie) => cookie.includes("idToken"))
      const userIdString = cookies.find((cookie) => cookie.includes("LastAuthUser"))
      if (idTokenString) {
        const token = idTokenString.split(".idToken=")[1]
        const id = userIdString.split(".LastAuthUser=")[1]
        commit("user/setToken", token)
        commit("user/setUserId", id)
        dispatch("user/loadInitialData")
      }
    }
  },
}
