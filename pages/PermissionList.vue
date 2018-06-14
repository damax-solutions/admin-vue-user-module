<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else-if="!items.length" class="notification is-warning">{{ $t('permission.message.no_items') }}</div>

    <div v-else="items.length" class="table-responsive">
        <table class="table is-narrow is-striped is-fullwidth">
            <thead>
                <tr>
                    <th :style="{ width: '25%' }">{{ $t('permission.header.code') }}</th>
                    <th :style="{ width: '30%' }">{{ $t('permission.header.category') }}</th>
                    <th :style="{ width: '45%' }">{{ $t('permission.header.description') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.code">
                    <td>{{ item.code }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.description | placeholder('-') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { permission as api } from '../api'

export default {
    data () {
        return { items: null }
    },

    computed: {
        loading () {
            return this.items === null
        }
    },

    async created () {
        this.items = await api.list()
    }
}
</script>
