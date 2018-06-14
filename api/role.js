import http, { handler } from '~/http'

export default {
    list () {
        return handler(http.get('/roles'))
    },

    get (code) {
        return handler(http.get(`/roles/${code}`))
    }
}
