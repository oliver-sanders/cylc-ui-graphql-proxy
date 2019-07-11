import { QueryProxy } from './driver';
import { TreeView } from './views/tree';
import { GraphView } from './views/graph';


// create the global query proxy through which all subscriptions are
// registered
var qproxy = new QueryProxy();

// initialise the views
var tree = new TreeView(qproxy);
var graph = new GraphView(qproxy);

// dump the query status
console.log('dump 1')
qproxy.print();

// change the state of the tree view
tree.expandTable();

// dump the query status
console.log('dump 2')
qproxy.print();


console.log('fin')
