import http, { handler } from '~/http'

export default {
    localesList () {
        return handler(http.get('/intl/locales'))
    },

    timezonesList () {
        return handler(http.get('/intl/timezones'))
    }
}
