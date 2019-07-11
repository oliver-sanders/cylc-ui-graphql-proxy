class View {

    constructor(name, qproxy) {
        this.name = name;
        this.hash = this.getHash();
        this.qproxy = qproxy;
        this.qproxy.register(this);
    }

    getHash() {
        /* pseudo-random hash for internal identification only */
        return Math.random();
    }

    id() {
        /* identifier for this view */
        return `${this.name}: ${this.hash}`;
    }

    destroy() {
        this.qproxy.unregister(this);
    }

}


export { View }
