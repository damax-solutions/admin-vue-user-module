
export default class {
    constructor (data) {
        Object.assign(this, data)
    }

    get disabled () {
        return !this.enabled
    }

    enable () {
        this.enabled = true
    }

    disable () {
        this.enabled = false
    }
}
