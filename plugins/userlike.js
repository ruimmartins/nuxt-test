import Vue from "vue"

const USERLIKE_CHAT_STATE_OFFLINE = "Offline"
const USERLIKE_PATH = "https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/80f578b6f85f92b849ffebac063cedd40fe577ba50ffa86d799eb7be8d1b44d8.js"

const Userlike = {
  install(Vue) {
    const state = Vue.observable({
      ready: false,
      chatOnline: false,
      container: null,
      button: null,
    })

    let chatState = USERLIKE_CHAT_STATE_OFFLINE

    // include userlike script
    const userlikeScript = document.createElement("script")
    userlikeScript.setAttribute("src", USERLIKE_PATH)

    document.head.appendChild(userlikeScript)

    // wait for userlike object to be initialized
    const waitForUserlikeObject = setInterval(() => {
      if (typeof userlike !== "undefined") {
        userlike.userlikeShowButton()
        state.ready = true

        clearInterval(waitForUserlikeObject)
      }
    }, 100)

    // regularly look for chat being online
    setInterval(() => {
      if (!state.ready) {
        return false
      }

      const updatedChatState = userlike.userlikeChatState()

      if (updatedChatState === chatState) {
        return
      }

      chatState = updatedChatState

      if (updatedChatState !== USERLIKE_CHAT_STATE_OFFLINE) {
        state.container = document.querySelectorAll('[id^="userlike-"]')[1]
        state.button = state.container.querySelector("iframe[title='Messenger button']")
        state.chatOnline = true
      } else {
        state.container = null
        state.button = null
        state.chatOnline = false
      }
    }, 1000)

    Vue.prototype.$userlike = state
  },
}

Vue.use(Userlike)
