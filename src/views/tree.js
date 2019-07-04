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
        host
    }

    families {
        name
        tasks
    }
}
`

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

    constructor(driver) {
        super('TreeView', driver)
        this.subscriptions = {
            'base': this.driver.subscribe(this, QUERY_BASIC)
        };
    }

    expandTable() {
        if ('table' in this.subscriptions) {
            return
        }
        this.subscriptions['table'] = this.driver.subscribe(this, QUERY_TABLE);
    }

    collapseTable() {
        if ('table' in this.subscriptions) {
            this.driver.unsubscribe(this.subscriptions['table']);
        }

    }

}


export { TreeView }
