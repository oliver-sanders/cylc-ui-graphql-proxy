import { parse } from 'graphql/language/parser';
import { print } from 'graphql/language/printer';
import { merge, gClone } from './gquery';


function prefix_lines(str, pref) {
    return pref + str.replace(/\n/g, `\n${pref}`);
}


class QueryProxy {
    constructor() {
        this.subscriptions = [];
        this.views = new WeakMap();
        this.query = null;
    }

    getHash() {
        /* psudo-random hash for internal identification only */
        return Math.random();
    }

    recompute () {
        /* recompute the combined query */
        if (this.subscriptions.length < 1) {
            this.query = null;
            return;
        }
        // merge together active subscriptions
        var root = gClone(this.subscriptions[0][2]);
        for (let subscription of this.subscriptions.slice(1)) {
            merge(root, subscription[2]);
        }
        this.query = root
    }

    register(view) {
        /* register a new view */
        this.views[view.id()] = view
    }

    unregister(view) {
        /* unregister a view (all subscriptions will be dropped */
        this.views.remove(view);
        this.subscriptions = this.subscriptions.filter(
            item => item[1] != view
        );
        this.recompute();
    }

    subscribe(view, query) {
        /* subscribe a view to a query */
        var hash = this.getHash();
        this.subscriptions.push(
            [hash, view, parse(query)]
        );
        this.recompute();
        return hash;
    }

    unsubscribe (hash) {
        /* un-subscribe a view from a query */
        this.subscriptions = this.subscriptions.filter(
            item => item[0] != hash
        );
        this.recompute();
    }

    print () {
        /* dump a human-readable representation of all subscriptions */
        var ret = 'Combined Query:';
        if (this.query) {
            ret += '\n' + prefix_lines(print(this.query), '    ');
        } else {
            ret += `\n    ${this.query}`;
        }
        var view;
        for (let id in this.views) {
            view = this.views[id];
            ret += `\n${id}`;
            for (let item of this.subscriptions.filter(item => item[1] == view)) {
                ret += `\n    # ${item[0]}`
                ret += '\n' + prefix_lines(print(item[2]), '    ');
            }
        }
        console.log(ret);
    }

}


export { QueryProxy }
