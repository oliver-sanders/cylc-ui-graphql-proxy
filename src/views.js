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


class MyView extends View {

    constructor(driver) {
        super('MyView', driver)
        this.driver.subscribe(
            this,
            `
                {
                    foo {
                        bar
                        baz
                    }
                }
            `
        );
        this.driver.subscribe(
            this,
            `
                {
                    foo {
                        baz
                        pub
                    }
                }
            `
        );
    }

}


export { MyView }
