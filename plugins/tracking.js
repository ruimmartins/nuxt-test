import { gtmTrackEvent } from '~/assets/scripts/tracking/tracking-helpers'

export default function ({ app }) {
  app.router.afterEach((to, from) => gtmTrackEvent("pageView", { pageName: to.name }))
}
