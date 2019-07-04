import { View } from './base'


// base query for all graph view functionality
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

// query required for family grouping
const QUERY_FAMILIES = `
{
    families {
        name
        tasks
    }
}
`


class GraphView extends View {

    constructor(qproxy) {
        super('GraphView', qproxy)
        this.subscriptions = {
            'base': this.qproxy.subscribe(this, QUERY_BASIC),
            'family': this.qproxy.subscribe(this, QUERY_FAMILIES)
        };
    }

    expandFamilies() {
        if ('family' in this.subscriptions) {
            return
        }
        this.subscriptions['family'] = this.qproxy.subscribe(this, QUERY_TABLE);
    }

    collapseFamilies() {
        if ('family' in this.subscriptions) {
            this.qproxy.unsubscribe(this.subscriptions['family']);
        }

    }

}


export { GraphView }
