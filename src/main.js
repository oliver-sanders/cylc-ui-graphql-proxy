import { merge } from './gquery';
import { DataDriver } from './driver';
import { TreeView } from './views/tree';
import { GraphView } from './views/graph';


var driver = new DataDriver();
var tree = new TreeView(driver);
var graph = new GraphView(driver);

driver.print();

tree.expandTable();
tree.collapseTable();

driver.print();


console.log('fin')
