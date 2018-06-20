<template>
    <v-select @input="value => $emit('input', value ? value : '')"
              :options="options"
              :value="selected"
              :disabled="disabled"
              :searchable="searchable"
              :input-id="id"
              :placeholder="$t('user.label.choose_timezone')" />
</template>

<script>
import vSelect from 'vue-select'

import { intl as api } from '../api'

export default {
    model: { prop: 'selected' },

    components: { vSelect },

    props: {
        id: String,
        selected: String,
        disabled: { type: Boolean, default: false },
        searchable: { type: Boolean, default: false }
    },

    data () {
        return { options: [] }
    },

    async created () {
        this.options = await api.timezonesList()
    }
}
</script>
