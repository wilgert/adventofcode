function processInput(input) {
  const lines = input.split('\n').filter(i => i);
  const moves = lines.map(line => {
    const [direction, distance] = line.split(' ');
    return {
      direction: direction,
      distance: parseInt(distance, 10),
    };
  });
  return moves;
}

function isInSameOrAdjacentRow(head: { x: number; y: number }, tail: { x: number; y: number }) {
  return Math.abs(head.y - tail.y) > 1;
}

function getInSameOrAdjacentColumn(head: { x: number; y: number }, tail: { x: number; y: number }) {
  return Math.abs(head.x - tail.x) > 1;
}

function manHattenDistance(head: { x: number; y: number }, tail: { x: number; y: number }) {
  return Math.abs(head.y - tail.y) + Math.abs(head.x - tail.x);
}

function printGrid(positions: Set<string>) {
  return [...positions].reduce((grid, position) => {
    const [x, y] = position.split(',');
    if (!grid[y]) {
      grid[y] = ['.', '.','.','.','.'];
    }
    grid[y][x] = '#'
    return grid;
  }, []).reverse().map(row => row.join('')).join('\n');
}

class Segment {

  constructor(public x = 0, public y = 0) {}

  positionHistory = new Set<string>();
}

class Rope {
  private readonly segments: Segment[] = [];

  get tail() {
    return this.segments[this.segments.length-1];
  }

  get head() {
    return this.segments[0];
  }
  constructor(segmentCount: number) {
    for (let i = 0; i < segmentCount; i++) {
      this.segments.push(new Segment());
    }
  }


  move(moves) {
    moves.forEach(move => {
      // Update head position
      for (let i = 0; i < move.distance; i++) {
        let head = this.segments[0];
        switch (move.direction) {
          case 'U':
            head.y += 1
            break;
          case 'D':
            head.y -= 1;
            break;
          case 'L':
            head.x -= 1;
            break;
          case 'R':
            head.x += 1;
            break;
        }

        for (let j = 0; j < this.segments.length-1; j++) {
          let leading = this.segments[j];
          let following = this.segments[j+1];
          if(leading.x === following.x) {
            if(Math.abs(leading.y - following.y) > 1) {
              following.y += (leading.y - following.y) / 2;
            }
          } else if(leading.y === following.y) {
            if(Math.abs(leading.x - following.x) > 1) {
              following.x += (leading.x - following.x) / 2;
            }
          } else {
            if (Math.abs(leading.x - following.x) === 1 && Math.abs(leading.y - following.y) > 1) {
              following.x = leading.x
            } else if (Math.abs(leading.y - following.y) === 1 && Math.abs(leading.x - following.x) > 1) {
              following.y = leading.y;
            }
          }
          leading.positionHistory.add(`${leading.x},${leading.y}`);
          following.positionHistory.add(`${following.x},${following.y}`);
        }
      }
    });

  }
}

export function part1(input): number {

  const rope = new Rope(2);
  const moves = processInput(input);
  rope.move(moves);


// Execute moves
  return rope.tail.positionHistory.size;
}

export function part2(input): number {

  const rope = new Rope(10);
  const moves = processInput(input);
  rope.move(moves);
  printGrid(rope.tail.positionHistory); // ?
  rope.tail.positionHistory; // ?

// Execute moves
  return rope.tail.positionHistory.size;
}
