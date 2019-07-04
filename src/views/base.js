class View {

    constructor(name, driver) {
        this.name = name;
        this.hash = this.getHash();
        this.driver = driver;
        this.driver.register(this);
    }

    getHash() {
        return Math.random();
    }

    id() {
        return `${this.name}: ${this.hash}`;
    }

    destroy() {
        this.driver.unregister(this);
    }

}


export { View }
