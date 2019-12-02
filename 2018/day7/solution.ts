import {readFile} from '../../common/readFile';
import * as path from "path";

let input = readFile(path.join(__dirname, 'input.txt'));
let testInput = readFile(path.join(__dirname, 'testInput.txt'));

class GraphNode {
    parent: GraphNode;

    children: GraphNode[] = [];

    constructor(public name: string, parent?: GraphNode) {}

    addChild(child: GraphNode) {
        this.children.push(child);
    }

    toString() {
        return this.name;
    }
}

function walkGraph(graphNode:  GraphNode ): string {
    return graphNode.name + graphNode.children.reduce
}

const part1 = (input: string) => {
    const graph: {[key: string]: GraphNode} = input
        .split('\n')
        .map(l => l.match(`Step ([A-Z]+) must be finished before step ([A-Z]+) can begin.`))
        .filter(match => !!match)
        .map(([_, parent, child]) => ({parent, child}))
        .reduce((graph, {parent, child}) => {
            const parentNode = graph[parent] || (graph['head'] = graph[parent] = new GraphNode(parent));
            const childNode = graph[child] || (graph[child] = new GraphNode(child, parentNode));

            parentNode.addChild(childNode);

            return graph;
        }, {});


    return walkGraph(graph.head);

};

console.log(JSON.stringify(part1(testInput), null, '  '));
console.log(part1(input));
