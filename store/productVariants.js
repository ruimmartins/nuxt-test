const LISTING_PLATFORMS_PATH = `http://localhost:8040/api/listing`
const COMPANY_ID = "51be0e45-add4-40a9-bd43-bd4d69d1ca22"

export const state = () => ({
  variants: {
    listing: [],
  },
})

export const mutations = {
  setProductVariants(state, { product, value }) {
    state.variants[product] = value
  },
}

export const getters = {
  getListingProductVariants(state) {
    return state.variants.listing
  },
}

export const actions = {
  async initProductVariants({ commit }) {
    const response = await this.$axios.get(`${LISTING_PLATFORMS_PATH}/${COMPANY_ID}/productvariants`)
    commit("setProductVariants", {
      product: "listing",
      value: response.data,
    })
  },
}
