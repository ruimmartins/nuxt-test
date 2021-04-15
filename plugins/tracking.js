export default function ({ app }) {
  app.router.afterEach((to, from) => console.log("tracking:" + to.name))
}
