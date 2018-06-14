<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else-if="!items.length" class="notification is-warning">{{ $t('user.message.no_items') }}</div>

    <div v-else>
        <pagination-summary :pagination="pagination" />

        <div class="table-responsive block">
            <table class="table is-narrow is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th :style="{ width: '25%' }">{{ $t('user.header.email') }}</th>
                        <th :style="{ width: '30%' }">{{ $t('user.header.full_name') }}</th>
                        <th :style="{ width: '14%' }">{{ $t('user.header.roles') }}</th>
                        <th :style="{ width: '10%' }" class="has-text-centered">{{ $t('user.header.enabled') }}</th>
                        <th :style="{ width: '18%' }">{{ $t('user.header.last_login') }}</th>
                        <th :style="{ width: '3%' }">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td><router-link :to="{ name: 'user_view', params: { id: item.id }}">{{ item.email }}</router-link></td>
                        <td>{{ item.fullName | placeholder('-') }}</td>
                        <td>{{ item.roles.join(', ') | placeholder('-') }}</td>
                        <td class="has-text-centered"><b-icon :icon="item.enabled ? 'toggle-on' : 'toggle-off'" /></td>
                        <td v-if="item.lastLoginAt">{{ item.lastLoginAt | moment('from') }}</td>
                        <td v-else>-</td>
                        <td class="has-text-right"><router-link :to="{ name: 'user_login_list', params: { id: item.id } }" :title="$t('user.tooltip.view_login_history')"><b-icon icon="list" /></router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <pagination @page-changed="fetch" :pagination="pagination" />
    </div>
</template>

<script>
import { user as service } from '../services'

export default {
    props: ['page'],

    data () {
        return { items: null, pagination: null }
    },

    computed: {
        loading () {
            return this.items === null
        }
    },

    async created () {
        this.fetch(this.page)
    },

    methods: {
        async fetch (page) {
            const { pagination, items } = await service.fetchList(page)

            this.pagination = pagination
            this.items = items
        }
    }
}
</script>
