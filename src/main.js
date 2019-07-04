import { merge } from './gquery';
import { DataDriver } from './driver';
import { MyView } from './views';


var driver = new DataDriver();
var viewA = new MyView(driver);

driver.print();

console.log('fin')
