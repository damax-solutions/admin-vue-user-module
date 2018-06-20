<template>
    <vue-loading v-if="loading" type="spin" :size="{ width: '75px' }" />

    <form v-else @submit.prevent="submit" class="box" novalidate>
        <name-input v-model="item.name" :disabled="inProgress" id-prefix="profile-name-" />

        <div class="buttons">
            <button :class="['button', 'is-primary', { 'is-loading': inProgress }]">{{ $t('button.save') }}</button>
            <button @click="cancel" :disabled="inProgress" class="button">{{ $t('button.cancel') }}</button>
        </div>
    </form>
</template>

<script>
import { profile as service } from '../services'
import { NameInput } from '../components'

export default {
    components: { NameInput },

    data () {
        return { item: null, inProgress: false }
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
            if (!await this.$validator.validate()) {
                return
            }

            this.inProgress = true

            try {
                await service.updateInfo(this.item)
            } catch ({ messages = [] }) {
                console.log(messages); return
            } finally {
                this.inProgress = false
            }

            this.$notify({ text: this.$t('profile.message.updated'), type: 'success' })

            this.$router.push({ name: 'profile' })
        }
    }
}
</script>
