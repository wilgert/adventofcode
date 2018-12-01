import {Direction} from './direction.enum';

const input = 277678;

interface Point {
   x: number;
   y: number;
}

class SpiralValue {
    constructor(
                public point: Point,
                public value: number) {}
}

class Spiral {
    private readonly origin: Point = {x: 0, y: 0};

    values: SpiralValue[] = [];
    get last(): SpiralValue {
        return this.values[0];
    }
    
    private rightBottom: Point = {...this.origin};
    private rightTop: Point = {...this.origin};
    private leftTop: Point = {...this.origin}
    private leftBottom: Point = {...this.origin}
    
    private direction = Direction.Right;

    constructor() {
        this.values = [new SpiralValue(this.origin, 1), ...this.values];
    }
    
    addPoint() {
        this.determineNewDirectionAndUpdateCorners();
        const newPosition = this.getPosition();
        this.values = [new SpiralValue(newPosition, this.getValue(newPosition)) , ...this.values];
    }

    private determineNewDirectionAndUpdateCorners() {
        switch (this.direction) {
            case Direction.Right:
                if (this.last.point.x > this.rightBottom.x) {
                    this.direction = Direction.Up;
                    this.rightBottom = {...this.last.point};
                }

                break;
            case Direction.Up:
                if (this.last.point.y > this.rightTop.y) {
                    this.direction = Direction.Left;
                    this.rightTop = {...this.last.point};
                }

                break;
            case Direction.Left:
                if (this.last.point.x < this.leftTop.x) {
                    this.direction = Direction.Down;
                    this.leftTop = {...this.last.point};
                }

                break;
            case Direction.Down:
                if (this.last.point.y < this.leftBottom.y) {
                    this.direction = Direction.Right;
                    this.leftBottom = {...this.last.point};
                }
                break;
        }
    }

    private getPosition(): Point {
        let {point} = this.last;
        let {x, y} = point;
        
        switch (this.direction) {
            case Direction.Right:
                x++;
                break;
            case Direction.Up:
                y++;
                break;
            case Direction.Left:
                x--;
                break;
            case Direction.Down:
                y--;
                break;
        }
        
        return {x, y};
    }

    private getValue(newPosition: Point): number {
        const neighbors = this.findNeighbors(newPosition);
        return neighbors.reduce((acc, n) => acc + n.value, 0);
    }
    
    private findNeighbors(newPoint: Point): SpiralValue[] {
        this.values;
        return this.values.filter(({point}) => {
            return Math.abs(newPoint.x - point.x) <= 1 && Math.abs(newPoint.y - point.y) <= 1
        });
    }
}

const spiral = new Spiral();

while(spiral.last.value < input) {
    spiral.addPoint();
}

spiral.last;