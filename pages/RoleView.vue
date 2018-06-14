<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else>
        <p class="title is-4">{{ item.code }}</p>
        <p class="subtitle is-6">{{ item.name }}</p>

        <hr>

        <div class="content" v-if="item.permissions.length">
            <ul>
                <li v-for="permission in item.permissions">{{ permission }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { role as api } from '../api'

export default {
    props: ['code'],

    data () {
        return { item: null }
    },

    computed: {
        loading () {
            return this.item === null
        }
    },

    async created () {
        this.item = await api.get(this.code)
    }
}
</script>
