import { auth as api } from '../api'
import { User } from '../models'

class Service {
    constructor (api) {
        this.api = api
    }

    async fetch () {
        return new User(await this.api.get())
    }

    changePassword ({ oldPassword, newPassword }) {
        return this.api.changePassword({ oldPassword, newPassword })
    }
}

export default new Service(api)
