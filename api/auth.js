import http, { fetchData } from '~/http'

export default {

    @fetchData
    get () {
        return http.get('/user')
    },

    @fetchData
    changePassword (data) {
        return http.put('/user/password', data)
    },

    @fetchData
    update (data) {
        return http.patch('/user', data)
    }
}
