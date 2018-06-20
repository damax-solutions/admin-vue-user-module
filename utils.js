import moment from 'moment'
import { Validator } from 'vee-validate'

import i18n from '~/translations'

export const changeLocale = locale => {
    i18n.locale = locale
    moment.locale(locale)
    Validator.locale = locale

    // axios.defaults.headers.common['Accept-Language'] = lang
    // document.documentElement.lang = lang
}
