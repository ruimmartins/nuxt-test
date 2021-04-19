const LISTING_PLATFORMS_PATH = `http://localhost:8040/api/listing`
const COMPANY_ID = "51be0e45-add4-40a9-bd43-bd4d69d1ca22"

export const state = () => ({
    data: null
})

export const mutations = {
    setListing(state, listing){
        state.data = listing
    }
}

export const actions = {
    async initListing({ commit }){
        let response = await this.$axios.get(`${LISTING_PLATFORMS_PATH}/${COMPANY_ID}`)
        commit('setListing', response.data)
    }
}