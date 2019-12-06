import {readFile} from '../../common/readFile';
import * as path from "path";
import {Graph, GraphNode} from "../../common/graph";

const input = readFile(path.join(__dirname, 'input.txt'));

const orbitsPart1 = `D)E
COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

export const createGraph = (orbits: string[]): Graph => {
    return orbits
        .map(l => l.match(`([A-Z0-9]+)\\)([A-Z0-9]+)`))
        .filter(match => !!match)
        .map(([_, parent, child]) => ({parent, child}))
        .reduce((graph, {parent, child}) => {
            const parentNode = graph[parent] || (graph[parent] = new GraphNode(parent));
            const childNode = graph[child] || (graph[child] = new GraphNode(child, parentNode));

            parentNode.child = childNode;
            if(!childNode.parent) {
                childNode.parent = parentNode;
            }
            return graph;
        }, {});
};

const orbitSystem = createGraph(input.split('\n'));
const testOrbitSystem1 = createGraph(orbitsPart1.split('\n')); // ?

export const distance = (node: GraphNode, targetNode?: GraphNode): number => {
    let result = 0;
    while(targetNode ? node !== targetNode : node.parent){
        result++;
        node = node.parent;
    }
    return result;
};

export const part1 = (graph: Graph): number => {
    const nodes = Object.values(graph);
    nodes.map(node => node.name); // ?
    nodes.length; // ?
    // distance(graph['CPF']); // ?
    return nodes.reduce((total, node) => total + distance(node),0);
};

part1(orbitSystem); // ?
part1(testOrbitSystem1); // ?


const testOrbits2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

const orbitSystem2 = createGraph(input.split('\n'));
const testOrbitSystem2 = createGraph(testOrbits2.split('\n'));

export const findLowestCommonAncestor = (p: GraphNode, q: GraphNode): GraphNode => {
    const visited = [];
    while(p.parent) {
        p = p.parent;
        visited.push(p);
    }

    while(!visited.includes(q) && q.parent){
        q = q.parent;
    }

    return q;
};

export const part2 = (orbitSystem) => {
    const lca = findLowestCommonAncestor(orbitSystem['SAN'], orbitSystem['YOU'] );
    return distance(orbitSystem['SAN'], lca) -1 +  distance(orbitSystem['YOU'], lca) -1;
}

part2(testOrbitSystem2); // ?
part2(orbitSystem2); // ?
