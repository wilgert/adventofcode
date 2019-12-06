export class GraphNode {
    child: GraphNode;

    constructor(public name: string, public parent?: GraphNode) {}

    toString() {
        return this.name;
    }
}

export type Graph = {[key: string]: GraphNode};
