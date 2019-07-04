import { View } from './base'


const QUERY_BASIC = `
{
    tasks {
        name
        cycles {
            cyclePoint
            state
            jobs {
                id
            }
        }
    }

    jobs {
        id
        state
    }

    edges {
        from
        to
        cyclePoint
        arrowStyle
    }
}
`

const QUERY_FAMILIES = `
{
    families {
        name
        tasks
    }
}
`


class GraphView extends View {

    constructor(driver) {
        super('GraphView', driver)
        this.subscriptions = {
            'base': this.driver.subscribe(this, QUERY_BASIC),
            'family': this.driver.subscribe(this, QUERY_FAMILIES)
        };
    }

    expandFamilies() {
        if ('family' in this.subscriptions) {
            return
        }
        this.subscriptions['family'] = this.driver.subscribe(this, QUERY_TABLE);
    }

    collapseFamilies() {
        if ('family' in this.subscriptions) {
            this.driver.unsubscribe(this.subscriptions['family']);
        }

    }

}


export { GraphView }
