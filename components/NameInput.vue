<template>
    <div class="field">
        <b-field :label="$t('user.label.first_name')" :label-for="idPrefix + 'first-name'">
            <b-input v-model="name.firstName" :disabled="disabled" :id="idPrefix + 'first-name'" type="text" />
        </b-field>

        <b-field :label="$t('user.label.last_name')" :label-for="idPrefix + 'last-name'">
            <b-input v-model="name.lastName" :disabled="disabled" :id="idPrefix + 'last-name'" type="text" />
        </b-field>

        <b-field :label="$t('user.label.middle_name')" :label-for="idPrefix + 'middle-name'">
            <b-input v-model="name.middleName" :disabled="disabled" :id="idPrefix + 'middle-name'" type="text" />
        </b-field>
    </div>
</template>

<script>
export default {
    model: { prop: 'name' },

    props: {
        idPrefix: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        name: { type: Object, required: true }
    }
}
</script>
