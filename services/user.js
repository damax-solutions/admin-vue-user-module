import { user as api } from '../api'
import { User } from '../models'

class Service {
    constructor (api) {
        this.api = api
    }

    async fetchList (page = 1) {
        const { pagination, data } = await this.api.list(page)

        return { pagination, items: data.map(item => new User(item)) }
    }

    async fetch (id) {
        return new User(await this.api.get(id))
    }

    async enable (item) {
        await this.api.enable(item.id)
        item.enable()
    }

    async disable (item) {
        await this.api.disable(item.id)
        item.disable()
    }

    async fetchLoginList (id, page = 1) {
        const { pagination, data } = await this.api.loginList(id, page)

        return { pagination, items: data }
    }
}

export default new Service(api)
