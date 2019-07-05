GraphQL Query Proxy
===================

This aims to solve the problem of having multiple independent "views" on the
same data where the data required by each view may overlap.

Queries are routed via a "query proxy" which holds a list of subscriptions and
merges them into a single "root query" which can be sent to the server.

* One "query proxy".
* One central [flat] data store.
* Many views.


Usage
-----

.. code-block:: console

   # install
   $ npm install --save-dev @babel/core @babel/cli @babel/preset-env
   $ npm install

   # run
   $ npm run start


TODO
----

* Match the Cylc Flow GraphQL schema (at the moment this is just an example not
  working code)
* Interface for one-off requests (where subscriptions aren't applicable)
* Add query level for multiple-workflow support
