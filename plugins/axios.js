export default function ({ $axios, store, redirect }) {
    $axios.onRequest(config => {
      if(store.state.user.token){
        config.headers.cookie = null
        config.headers.Authorization = 'Bearer ' + store.state.user.token
        return config
      }else{
        redirect({name: 'index'})
      }
    })
  }