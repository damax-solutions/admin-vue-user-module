<template>
    <div>
        <h3 class="title has-text-grey">{{ $t('security.header.login') }}</h3>

        <p class="subtitle has-text-grey">{{ $t('security.message.login') }}</p>

        <div class="notification is-danger" v-if="error">{{ $t('security.message.bad_credentials')}}</div>

        <form @submit.prevent="submit" class="box" novalidate>
            <b-field :type="errors.first('username') ? 'is-danger' : ''">
                <b-input v-model="inputs.username"
                         v-validate="'required|email'"
                         :placeholder="$t('security.label.email')"
                         :disabled="inProgress"
                         :data-vv-as="$t('security.label.email')"
                         data-vv-name="username"
                         size="is-large"
                         type="text"
                         autofocus />
            </b-field>


            <b-field :type="errors.first('password') ? 'is-danger' : ''">
                <b-input v-model="inputs.password"
                         v-validate="'required'"
                         :placeholder="$t('security.label.password')"
                         :disabled="inProgress"
                         :data-vv-as="$t('security.label.password')"
                         ref="password"
                         data-vv-name="password"
                         size="is-large"
                         type="password" />
            </b-field>

            <button :class="['button is-info is-large is-fullwidth', { 'is-loading': inProgress }]">{{ $t('security.button.login') }}</button>
        </form>
    </div>
</template>

<script>
const fields = { username: '', password: '' }

export default {
    data () {
        return {
            inputs: { ...fields },
            inProgress: false,
            error: false
        }
    },

    methods: {
        async submit () {
            if (!await this.$validator.validate()) {
                return
            }

            this.inProgress = true

            try {
                await this.$auth.login({
                    data: this.inputs,
                    error: () => {
                        // Avoid uncaught error.
                    }
                })
            } catch (e) {
                this.error = true
                this.inputs.password = ''
                this.$refs.password.focus()
            } finally {
                this.inProgress = false
            }
        }
    }
}
</script>
