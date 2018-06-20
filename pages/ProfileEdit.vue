<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <form v-else @submit.prevent="submit" class="box">
        <name-input v-model="item.name" :disabled="inProgress" id-prefix="profile-name-" />

        <b-field :label="$t('user.label.locale')" :message="messages.locale" :type="messages.locale ? 'is-danger' : ''" label-for="profile-locale">
            <locale-input v-model="item.locale" :disabled="inProgress" id="profile-locale" />
        </b-field>

        <b-field :label="$t('user.label.timezone')" :message="messages.timezone" :type="messages.timezone ? 'is-danger' : ''" label-for="profile-timezone">
            <timezone-input v-model="item.timezone" :disabled="inProgress" id="profile-timezone" />
        </b-field>

        <div class="buttons">
            <button :class="['button', 'is-primary', { 'is-loading': inProgress }]">{{ $t('button.save') }}</button>
            <button @click.prevent="cancel" :disabled="inProgress" class="button">{{ $t('button.cancel') }}</button>
        </div>
    </form>
</template>

<script>
import { profile as service } from '../services'
import { NameInput, LocaleInput, TimezoneInput } from '../components'
import { changeLocale } from '../utils'

const fields = { timezone: '', locale: '' }

export default {
    components: { NameInput, LocaleInput, TimezoneInput },

    data () {
        return {
            messages: { ...fields },
            item: null,
            inProgress: false
        }
    },

    computed: {
        loading () {
            return this.item === null
        }
    },

    async created () {
        this.item = await service.fetch()
    },

    methods: {
        cancel () {
            this.$router.replace({ name: 'profile' })
        },

        async submit () {
            this.inProgress = true

            try {
                await service.updateInfo(this.item)
            } catch ({ messages = [] }) {
                this.messages = messages; return
            } finally {
                this.inProgress = false
            }

            changeLocale(this.item.locale)

            this.$notify({ text: this.$t('profile.message.updated'), type: 'success' })

            this.$router.push({ name: 'profile' })
        }
    }
}
</script>
