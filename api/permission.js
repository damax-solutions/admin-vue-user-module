import http, { handler } from '../../../http'

export default {
    list () {
        return handler(http.get('/permissions'))
    }
}
