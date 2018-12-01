enum Direction{
  Right,
  Up,
  Left,
  Down
}

export const part1 = (input: number) =>{
  let spiral = [];
  let row = 100000, col = 100000;

  let direction: Direction = Direction.Right;

  for(let i = 0; i<input; i++){
    spiral[i] = {row, col};

      switch (direction) {
          case Direction.Right:
              col++;
              break;
          case Direction.Up:
              row--;
              break;
          case Direction.Left:
              col--;
              break;
          case Direction.Down:
              row++;
              break;
      }
  }


  return spiral;
};

let result = part1(1);

let input = 277678;
let rounded = Math.round(Math.sqrt(input)) /*?*/
rounded % 2 === 0 ? rounded++ : rounded;

let corner = rounded * rounded /*?*/
let rowlength = rounded - 1 /*?*/

let distance = corner - input /*?*/

rowlength / 2 + rowlength / 2 - 51 /*?*/
result;

result = part1(12);

result;


/*

37  36  35  34  33  32  31
38  17  16  15  14  13  30
39  18   5   4   3  12  29
40  19   6   1   2  11  28
41  20   7   8   9  10  27
42  21  22  23  24  25  26
43  44  45  46  47  48  49
* */

