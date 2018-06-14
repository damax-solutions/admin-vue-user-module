<template>
    <form @submit.prevent="submit" class="box" novalidate>
        <b-field :label="$t('password.label.current_password')"
                 :message="errors.first('oldPassword') || messages.oldPassword"
                 :type="errors.first('oldPassword') || messages.oldPassword ? 'is-danger' : ''"
                 label-for="password-old">
            <b-input v-model="inputs.oldPassword"
                     v-validate="'required'"
                     :disabled="inProgress"
                     :data-vv-as="$t('password.label.current_password')"
                     data-vv-name="oldPassword"
                     id="password-old"
                     type="password" />
        </b-field>

        <b-field :label="$t('password.label.new_password')"
                 :message="errors.first('newPassword') || messages.newPassword"
                 :type="errors.first('newPassword') || messages.newPassword ? 'is-danger' : ''"
                 label-for="password-new">
            <b-input v-model="inputs.newPassword"
                     v-validate="'required'"
                     :disabled="inProgress"
                     :data-vv-as="$t('password.label.new_password')"
                     data-vv-name="newPassword"
                     id="password-new"
                     type="password" />
        </b-field>

        <b-field :label="$t('password.label.repeat_new_password')"
                 :message="errors.first('repeatNewPassword')"
                 :type="errors.first('repeatNewPassword') ? 'is-danger' : ''"
                 label-for="password-new-repeat">
            <b-input v-model="repeatNewPassword"
                     v-validate="{ required: true, is: inputs.newPassword }"
                     :disabled="inProgress"
                     :data-vv-as="$t('password.label.repeat_new_password')"
                     data-vv-name="repeatNewPassword"
                     id="password-new-repeat"
                     type="password" />
        </b-field>

        <button :class="['button', 'is-primary', { 'is-loading': inProgress }]">{{ $t('password.button.change') }}</button>
    </form>
</template>

<script>
import { profile as service } from '../services'

const fields = { oldPassword: '', newPassword: '' }

export default {
    data () {
        return {
            inputs: { ...fields },
            messages: { ...fields },
            repeatNewPassword: '',
            inProgress: false
        }
    },

    mounted () {
        this.$validator.localize(this.$validator.locale, {
            custom: {
                repeatNewPassword: { is: this.$t('password.message.mismatch') }
            }
        })
    },

    methods: {
        async submit () {
            if (!await this.$validator.validate()) {
                return
            }

            this.inProgress = true

            try {
                await service.changePassword(this.inputs)
            } catch ({ messages = [] }) {
                this.messages = messages; return
            } finally {
                this.inProgress = false
            }

            this.$notify({ text: this.$t('password.message.changed'), type: 'success' })

            this.$router.push({ name: 'profile' })
        }
    }
}
</script>
