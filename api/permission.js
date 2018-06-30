import http, { fetchData } from '~/http'

export default {

    @fetchData
    list () {
        return http.get('/permissions')
    }
}
