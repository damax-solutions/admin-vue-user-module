import http, { fetchData } from '~/http'

export default {

    @fetchData
    list () {
        return http.get('/roles')
    },

    @fetchData
    get (code) {
        return http.get(`/roles/${code}`)
    }
}
