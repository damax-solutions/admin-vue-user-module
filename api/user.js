import http, { fetchData } from '~/http'

export default {

    @fetchData
    list (page) {
        const params = { page }

        return http.get('/users', { params })
    },

    @fetchData
    get (id) {
        return http.get(`/users/${id}`)
    },

    @fetchData
    enable (id) {
        return http.put(`/users/${id}/enable`)
    },

    @fetchData
    disable (id) {
        return http.delete(`/users/${id}/disable`)
    },

    @fetchData
    loginList (id, page) {
        const params = { page }

        return http.get(`/users/${id}/logins`, { params })
    }
}
