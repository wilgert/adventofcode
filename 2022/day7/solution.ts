import { readFile } from "../../common/readFile";

const input = readFile(__dirname + "/input.txt");
const example = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`
function dfs(node: Node, callback: (node: Node) => void) {
  callback(node);
  for (const child of node.children.values()) {
    dfs(child, callback);
  }
}

class Node {
  children: Map<string, Node>;
  parent: Node;

  constructor(public readonly name: string, public size: number) {
    this.children = new Map<string, Node>();
  }

  addChild(child: Node) {
    child.parent = this;

    this.children.set(child.name, child);
  }

  getTotalSize() {
    return [...this.children.values()].reduce((total, child) => total + child.getTotalSize(), this.size);
  }
}

class DirectoryTree {
  root: Node;
  current: Node;

  constructor(input: string[]) {
    this.root = new Node("/", 0);
    this.current = this.root;
    this.parseInput(input);
  }

  private parseInput(input: string[]) {
    for (let i = 0; i < input.length; i++){
      const line = input[i];
      if (line && line.startsWith("$ cd ")) {
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
      } else if (line && line.startsWith("$ ls")) {
        const nextCommandLine = input.findIndex((line, index) => index > i && line.startsWith(`$ `)) ;

        let sliceEnd = input.length;
        if(nextCommandLine > 0) {
          sliceEnd = nextCommandLine;
        }

        const files = input.slice(i + 1, sliceEnd);
        for (const file of files) {
          const [dirOrSize, name] = file.split(" ");

          if(dirOrSize === 'dir'){
            if (!this.current.children.has(name)) {
              this.current.addChild(new Node(name, 0));
            }
          } else {
            this.current.size += parseInt(dirOrSize, 10);
          }
        }
        if(nextCommandLine > 0) {
          i = nextCommandLine - 1;
        }
      }
    }
  }
}

function part1(input) {
  const tree = new DirectoryTree(input.split(`\n`).filter(i => i));
  const result = [];
  tree.current = tree.root;
  dfs(tree.root, (node) => {
    const size = node.getTotalSize();
    if (size <= 100000) {
      result.push(size);
    }
  });
  return result.reduce((t, i) => t + i);
}

function part2(input) {
  const tree = new DirectoryTree(input.split(`\n`).filter(i => i));
  const result = [];
  tree.current = tree.root;

  dfs(tree.root, (node) => {
    const size = node.getTotalSize();
    result.push(size);
  });

  const total = tree.root.getTotalSize();
  const free = 70000000 - total;
  const needed = 30000000
  return Math.min(...result.filter(size => size > needed - free ));
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
