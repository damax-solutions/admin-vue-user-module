import http, { handler } from '../../../http'

export default {
    list (page) {
        const params = { page }

        return handler(http.get('/users', { params }))
    },

    get (id) {
        return handler(http.get(`/users/${id}`))
    },

    enable (id) {
        return handler(http.put(`/users/${id}/enable`))
    },

    disable (id) {
        return handler(http.delete(`/users/${id}/disable`))
    },

    loginList (id, page) {
        const params = { page }

        return handler(http.get(`/users/${id}/logins`, { params }))
    }
}
