<template>
    <div>
        <p>{{listing}}</p>
    </div>
</template>

<script>
    export default {
        name: 'listing',
        middleware: [
            'auth',
            'listing'
        ],
        data(){
            product: 'listing'
        },
        computed:{
            listing(){
                return this.$store.state.listing.data
            }
        },
        async asyncData({store}){
            await store.dispatch('listing/initListing')
        }
    }
</script>