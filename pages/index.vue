<template>
    <div>
        <p>{{id}}</p>
        <p>{{token}}</p>
        <button @click="login">
            Login
        </button>
        <button @click="logout">
            logout
        </button>
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
            token(){
                return this.$store.state.user.token
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