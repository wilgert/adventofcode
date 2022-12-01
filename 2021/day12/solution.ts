import { readFile } from "../../common/readFile";

class Node {
  public connectedTo: Set<Node> = new Set<Node>();

  constructor(public name: string) {}

  addConnection(other: Node) {
    this.connectedTo.add(other);
  }
}

function processInput(input: string): { from: string; to: string }[] {
  return input
    .split("\n")
    .filter((l) => l)
    .map((l) => l.match(/(\w*)-(\w*)/))
    .map(([, from, to]) => ({ from, to }));
}

const input = readFile(__dirname + "/input.txt");

function traverse(
  node: Node,
  route?,
  routes = [],
  visited?: Set<string>
): Node[][] {
  if (node.name === "end") {
    routes.push(route);
  } else {
    node.connectedTo.forEach((connection) => {
      let visited;
      node.name; // ?
      if (node.name === "start") {
        visited = new Set<string>();
        route = [];
      }
      if (visited.has(node.name)) {
        return;
      }
      visited.add(node.name);

      route.push(node.name);

      visited.has(node.name); // ?
      traverse(connection, route, routes, visited);
    });
  }

  return routes;
}

export function part1(input: string): number {
  const nodes = processInput(input);
  const graph = nodes.reduce((graph, { from, to }) => {
    if (!graph.has(from)) {
      graph.set(from, new Node(from));
    }
    let fromNode = graph.get(from);
    if (!graph.has(to)) {
      graph.set(to, new Node(to));
    }
    let toNode = graph.get(to);

    fromNode.addConnection(toNode);
    toNode.addConnection(fromNode);

    return graph;
  }, new Map<string, Node>());

  const start = graph.get("start"); // ?

  const routes = traverse(start);

  return routes.length;
}

// part1(input); // ?
// part2(input); // ?
