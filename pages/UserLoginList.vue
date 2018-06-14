<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else-if="!items.length" class="notification is-warning">{{ $t('user.message.no_login_history') }}</div>

    <div v-else>
        <pagination-summary :pagination="pagination" />

        <div class="table-responsive block">
            <table class="table is-narrow is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th :style="{ width: '18%' }">{{ $t('user_login.header.created_at') }}</th>
                        <th :style="{ width: '15%' }">{{ $t('user_login.header.client_ip') }}</th>
                        <th :style="{ width: '67%' }">{{ $t('user_login.header.user_agent') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.createdAt | moment('L LT') }}</td>
                        <td>{{ item.clientIp }}</td>
                        <td>{{ item.userAgent }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <pagination @page-changed="fetch" :pagination="pagination" :proximity="4" />
    </div>
</template>

<script>
import { user as service } from '../services'

export default {
    props: ['id', 'page'],

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
            const { pagination, items } = await service.fetchLoginList(this.id, page)

            this.pagination = pagination
            this.items = items
        }
    }
}
</script>
