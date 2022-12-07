import { readFile } from "../../common/readFile";

const input = readFile(__dirname + "/input.txt");
const example = `

`

class Node {
  name: string;
  size: number;
  children: Map<string, Node>;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
    this.children = new Map<string, Node>();
  }

  addChild(child: Node) {
    this.children.set(child.name, child);
  }
}

class DirectoryTree {
  root: Node;
  current: Node;

  constructor() {
    this.root = new Node("/", 0);
    this.current = this.root;
  }

  parseInput(input: string[]) {
    for (const line of input) {
      if (line.startsWith("$ cd ")) {
        const directory = line.slice(5);
        if (directory === "/") {
          this.current = this.root;
        } else if (directory === "..") {
          this.current = this.current.parent;
        } else {
          if (!this.current.children.has(directory)) {
            this.current.addChild(new Node(directory, 0));
          }
          this.current = this.current.children.get(directory);
        }
      } else if (line.startsWith("$ ls")) {
        const files = line.slice(4).split(" ");
        for (const file of files) {
          const [name, size] = file.split(".");
          if (size) {
            this.current.size += parseInt(size, 10);
          } else {
            if (!this.current.children.has(name)) {
              this.current.addChild(new Node(name, 0));
            }
          }
        }
      }
    }
  }

  getTotalSize(directory: string): number {
    if (!this.current.children.has(directory)) {
      return 0;
    }
    const node = this.current.children.get(directory);
    return node.size + Array.from(node.children.values()).reduce((acc, child) => acc + this.getTotalSize(child.name), 0);
  }
}

function part1(input) {
  return new DirectoryTree(input);
}

function part2(input) {
  return findFirstMarker(input, 14);
}

part1(input); // ?
part1(example); // ?
part2(input); // ?
part2(example); // ?
