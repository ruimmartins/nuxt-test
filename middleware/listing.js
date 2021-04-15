export default function ({ store, redirect }) {
    if(!store.state.productVariants.variants.listing.length){
        return redirect({name: 'index'})
    }
}