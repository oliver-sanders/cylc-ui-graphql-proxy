import { parse } from 'graphql/language/parser';
import { print } from 'graphql/language/printer';


function gClone(query) {
    /* clone a query, why oh why isn't there a better way of doing this in JS!
     * this is acytually kinda dangerous as there can be lost information */
    return JSON.parse(JSON.stringify(query));
}


function emptyQuery() {
    return {
        kind: 'Document',
        definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                name: undefined,
                variableDefinitions: [],
                directives: [],
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: []
                    // loc: { start: N1, end: N2 }
                },
                // loc: { start: 0, end: NN }
            }
        ]
    }
}


function getSelections(a) {
    /* return dictionary of selections present on a node. */
    var selections = {};
    if (! a.selectionSet) {
        return {};
    }
    if (! a.selectionSet.selections) {
        return {};
    }
    for (let selection of a.selectionSet.selections) {
        if (selection.kind === 'Field') {
            selections[selection.name.value] = selection;
        }
    }
    return selections;
}


function mergeSelection(a, b) {
    /* merge b into a */
    var aSel = getSelections(a);
    var bSel = getSelections(b);
    for (let selection in bSel) {
        if (!(selection in aSel)) {
            a.selectionSet.selections.push(gClone(bSel[selection]));
        } else {
            mergeSelection(aSel[selection], bSel[selection]);
        }
    }
}


function merge(a, b) {
    /* merge two graphql schema */
    mergeSelection(a.definitions[0], b.definitions[0]);
}


function test() {
    var a = parse(`
    {
        a {
            foo
            bar
            pub {
                j
            }
        }
        c {
            y
        }
    }
    `);

    var b = parse(`
    {
        a {
            bar
            baz
            pub {
                k
            }
        }

        b {
            x
        }

    }`);

    merge(a, b);
    console.log(print(a));
}

//test();

export { merge, emptyQuery, gClone }
