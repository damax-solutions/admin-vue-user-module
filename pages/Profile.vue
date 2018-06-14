<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <div v-else>
        <div class="buttons is-right">
            <router-link :to="{ name: 'profile_edit' }" class="button is-info">{{ $t('profile.button.edit') }}</router-link>
            <router-link :to="{ name: 'profile_change_password' }" class="button is-warning">{{ $t('password.button.change') }}</router-link>
        </div>

        <div class="box">
            <table class="table is-fullwidth">
                <tbody>
                    <tr>
                        <th>{{ $t('user.header.email') }}</th>
                        <td>{{ item.email }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.mobile_phone') }}</th>
                        <td>{{ item.mobilePhone }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.full_name') }}</th>
                        <td>{{ item.fullName | placeholder('-') }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.timezone') }}</th>
                        <td>{{ item.timezone }}</td>
                    </tr>
                    <tr>
                        <th>{{ $t('user.header.locale') }}</th>
                        <td>{{ item.locale | uppercase }}</td>
                    </tr>
                </tbody>
            </table>
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
