export default function ({ $axios, store, redirect }) {
    $axios.onRequest(config => {
      if(store.state.user.token){
        if(process.server) config.headers.cookie = null
        config.headers.Authorization = 'Bearer ' + store.state.user.token
        return config
      }else{
        redirect({name: 'index'})
      }
    })

    $axios.onResponse(response => {
      if(response.status.code === 401){
        store.dispatch('user/setToken', null)
        store.dispatch('user/setUser', null)
        store.dispatch('user/setUserId', null)
        redirect({name: 'index'})
      }
    })
  }