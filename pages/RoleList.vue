<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else-if="!items.length" class="notification is-warning">{{ $t('role.message.no_items') }}</div>

    <div v-else="items.length" class="table-responsive">
        <table class="table is-narrow is-striped is-fullwidth">
            <thead>
                <tr>
                    <th :style="{ width: '40%' }">{{ $t('role.header.code') }}</th>
                    <th :style="{ width: '60%' }">{{ $t('role.header.name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.code">
                    <td><router-link :to="{ name: 'user_role_view', params: { code: item.code }}">{{ item.code }}</router-link></td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { role as api } from '../api'

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
