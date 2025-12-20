const input = [
  "30373",
  "25512",
  "65332",
  "53549",
  "35390"
];

function countVisibleTrees(map: string[]): number {
  let count = 0;

  // Count the trees on the top and left edges of the map
  for (let i = 0; i < map.length; i++) {
    const topTree = map[0][i];
    const leftTree = map[i][0];
    if (topTree !== "0" && leftTree !== "0") {
      count++;
    }
  }

  // Count the trees on the right and bottom edges of the map
  for (let i = 0; i < map.length; i++) {
    const bottomTree = map[map.length - 1][i];
    const rightTree = map[i][map.length - 1];
    if (bottomTree !== "0" && rightTree !== "0") {
      count++;
    }
  }

  // Count the trees in the interior of the map
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      const tree = map[i][j];
      if (tree === "0") continue;

      // Check if the tree is visible from the left
      let isVisibleFromLeft = true;
      for (let k = j - 1; k >= 0; k--) {
        if (map[i][k] > tree) {
          isVisibleFromLeft = false;
          break;
        }
      }
      if (isVisibleFromLeft) {
        count++;
        continue;
      }

      // Check if the tree is visible from the right
      let isVisibleFromRight = true;
      for (let k = j + 1; k < map[0].length; k++) {
        if (map[i][k] > tree) {
          isVisibleFromRight = false;
          break;
        }
      }
      if (isVisibleFromRight) {
        count++;
        continue;
      }

      // Check if the tree is visible from the top
      let isVisibleFromTop = true;
      for (let k = i - 1; k >= 0; k--) {
        if (map[k][j] > tree) {
          isVisibleFromTop = false;
          break;
        }
      }
      if (isVisibleFromTop) {
        count++;
        continue;
      }

      // Check if the tree is visible from the bottom
      let isVisibleFromBottom = true;
      for (let k = i + 1; k < map.length; k++) {
        if (map[k][j] > tree) {
          isVisibleFromBottom = false;
          break;
        }
      }
      if (isVisibleFromBottom) {
        count++;
      }
    }
  }

  return count;
}

const visibleTrees = countVisibleTrees(input);
console.log(`There are ${visibleTrees} visible`);
