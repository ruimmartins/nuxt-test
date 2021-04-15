export default function ({ store, route }) {
    if (route.query && route.query.contactid) {
        store.dispatch('user/setContactId', route.query.contactid)
    }
}