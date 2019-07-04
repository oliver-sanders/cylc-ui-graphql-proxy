import { View } from './base'


// base query for all tree view functionality
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
        host
    }

    families {
        name
        tasks
    }
}
`

// represents the fields of the tree view which we will probably want to hide
// by default
const QUERY_TABLE = `
{
    jobs {
        id
        state
        jobID
        jobSubmissionMethod
        startTime
        endTime
        DTMean
        latestMessage
    }
}
`


class TreeView extends View {

    constructor(qproxy) {
        super('TreeView', qproxy)
        this.subscriptions = {
            'base': this.qproxy.subscribe(this, QUERY_BASIC)
        };
    }

    expandTable() {
        if ('table' in this.subscriptions) {
            return
        }
        this.subscriptions['table'] = this.qproxy.subscribe(this, QUERY_TABLE);
    }

    collapseTable() {
        if ('table' in this.subscriptions) {
            this.qproxy.unsubscribe(this.subscriptions['table']);
        }

    }

}


export { TreeView }
