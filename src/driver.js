import { parse } from 'graphql/language/parser';
import { print } from 'graphql/language/printer';
import { merge, emptyQuery, gClone } from './gquery';


function prefix_lines(str, pref) {
    return pref + str.replace(/\n/g, `\n${pref}`);
}


class DataDriver {
    constructor() {
        this.subscription;
        this.subscriptions = [];
        this.views = new WeakMap();
        this.query = null;
    }

    getHash() {
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
        this.views[view.id()] = view
    }

    unregister(view) {
        this.view.remove(view);
        this.subscriptions = this.subscriptions.filter(
            item => item[1] != view
        );
        this.recompute();
    }

    subscribe(view, query) {
        var hash = this.getHash();
        this.subscriptions.push(
            [hash, view, parse(query)]
        );
        this.recompute();
        return hash;
    }

    unsubscribe (hash) {
        this.subscriptions = this.subscriptions.filter(
            item => item[0] != hash
        );
        this.recompute();
    }

    print () {
        var ret = 'Root Query:';
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


export { DataDriver }
