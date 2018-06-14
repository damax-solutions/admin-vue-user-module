<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else>
        <div class="content">
            <pre>{{ item }}</pre>
        </div>
    </div>
</template>

<script>
import { profile as service } from '../services'

export default {
    data () {
        return { item: null }
    },

    computed: {
        loading () {
            return this.item === null
        }
    },

    async created () {
        this.item = await service.fetch()
    }
}
</script>
