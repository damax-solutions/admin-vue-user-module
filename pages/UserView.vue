<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else>
        <div class="buttons is-right">
            <a v-if="item.disabled" @click.prevent="enable" :class="['button', 'is-danger', { 'is-loading': enabling }]">{{ $t('user.button.enable') }}</a>
            <a v-else @click.prevent="disable" :class="['button', 'is-warning', { 'is-loading': enabling }]">{{ $t('user.button.disable') }}</a>
        </div>

        <div class="box">
            <table class="table is-fullwidth">
                <tbody>
                    <tr>
                        <th :style="{ width: '35%' }">{{ $t('user.header.id') }}</th>
                        <td>{{ item.id }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.email') }}</th>
                        <td>{{ item.email }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.mobile_phone') }}</th>
                        <td>{{ item.mobilePhone }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.last_name') }}</th>
                        <td>{{ item.name.lastName | placeholder('-') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.first_name') }}</th>
                        <td>{{ item.name.firstName | placeholder('-') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.middle_name') }}</th>
                        <td>{{ item.name.middleName | placeholder('-') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.roles') }}</th>
                        <td>{{ item.roles.join(', ') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.timezone') }}</th>
                        <td>{{ item.timezone }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.locale') }}</th>
                        <td>{{ item.locale | uppercase }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.enabled') }}</th>
                        <td><b-icon :icon="item.enabled ? 'toggle-on' : 'toggle-off'" /></td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.last_login') }}</th>
                        <td v-if="item.lastLoginAt">{{ item.lastLoginAt | moment('from') }}</td>
                        <td v-else>-</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.created_at') }}</th>
                        <td>{{ item.createdAt | moment('L LT') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.updated_at') }}</th>
                        <td>{{ item.updatedAt | moment('L LT') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { user as service } from '../services'

export default {
    props: ['id'],

    data () {
        return { item: null, enabling: false }
    },

    computed: {
        loading () {
            return this.item === null
        }
    },

    async created () {
        this.item = await service.fetch(this.id)
    },

    methods: {
        async enable () {
            const { value: result = false } = await this.$swal({
                type: 'question',
                showCancelButton: true,
                title: this.$t('user.dialog.enable_confirmation'),
                cancelButtonText: this.$t('button.cancel')
            })

            if (!result) {
                return
            }

            this.enabling = true
            await service.enable(this.item)
            this.enabling = false

            this.$notify({ text: this.$t('user.message.enabled'), type: 'success' })
        },

        async disable () {
            const { value: result = false } = await this.$swal({
                type: 'question',
                showCancelButton: true,
                title: this.$t('user.dialog.disable_confirmation'),
                cancelButtonText: this.$t('button.cancel')
            })

            if (!result) {
                return
            }

            this.enabling = true
            await service.disable(this.item)
            this.enabling = false

            this.$notify({ text: this.$t('user.message.disabled'), type: 'success' })
        }
    }
}
</script>
