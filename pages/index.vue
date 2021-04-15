<template>
    <div>
        <p><strong>User ID:</strong> {{id}}</p>
        <p><strong>Contact ID </strong> {{contactId}}</p>
        <p><strong>Token: </strong> {{token}}</p>
        <p><strong>Listing Product Variants </strong> {{productVariants}}</p>
        <button @click="login">
            Login
        </button>
        <button @click="logout">
            logout
        </button>
        <NuxtLink v-if="productVariants.length > 0" :to="{name: 'listing'}">
            listing
        </NuxtLink>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex'

    export default {
        name: 'index',
        computed:{
            id(){
                return this.$store.state.user.id
            },
            contactId(){
                return this.$store.state.user.contactId
            },
            token(){
                return this.$store.state.user.token
            },
            productVariants(){
                return this.$store.state.productVariants.variants.listing
            }
        },
        methods:{
            ...mapActions({
                login: 'user/login',
                logout: 'user/logout'
            })
        }
    }
</script>