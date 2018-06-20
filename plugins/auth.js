import VueAuth from '@websanova/vue-auth'
import http from '@websanova/vue-auth/drivers/http/axios.1.x.js'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x.js'

import { changeLocale } from '../utils'

const auth = {
    request (request, token) {
        this.options.http._setHeaders.call(this, request, { Authorization: 'Bearer ' + token })
    },

    response ({ data }) {
        const keys = Object.keys(data)

        if (keys.length === 1 && keys.includes('token')) {
            return data.token
        }
    }
}

export default [VueAuth, {
    auth, http, router,

    tokenDefaultName: 'token',
    tokenStore: ['localStorage'],
    loginData: {
        url: 'login'
    },
    logoutData: {
        redirect: '/login'
    },
    fetchData: {
        url: 'user'
    },
    forbiddenRedirect: {
        path: '/access-denied'
    },
    refreshData: {
        url: 'user/refresh-token'
    },
    parseUserData: data => {
        changeLocale(data.locale)

        return data
    }
}]
