import http, { handler } from '~/http'

export default {
    get () {
        return handler(http.get('/user'))
    },

    changePassword (data) {
        return handler(http.put('/user/password', data))
    },

    update (data) {
        return handler(http.patch('/user', data))
    }
}
