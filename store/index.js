import { withSSRContext } from "aws-amplify"

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req, redirect }) {
    const SSR = withSSRContext({ req })
    try{
      const currentSession = await SSR.API.Auth.currentSession()
      commit("user/setToken", currentSession.idToken.jwtToken)
      commit("user/setUserId", currentSession.idToken.payload.name)
      await dispatch("user/loadInitialData")
    }catch(e){
      redirect({name: 'index'})
    }
  },
}
