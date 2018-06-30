import http, { fetchData } from '~/http'

export default {

    @fetchData
    localesList () {
        return http.get('/intl/locales')
    },

    @fetchData
    timezonesList () {
        return http.get('/intl/timezones')
    }
}
