import { readFile } from "../../common/readFile";

const input = readFile(__dirname + "/input.txt");

function findFirstMarker(data: string, markerLength: number = 4): number {
  // Keep track of the last markerLength characters received
  let lastMarker: string[] = [];

  // Loop through the data one character at a time
  for (let i = 0; i < data.length; i++) {
    const ch = data[i];

    // Add the current character to the lastMarker array
    lastMarker.push(ch);

    // If the lastMarker array has more than markerLength characters, remove the first one
    if (lastMarker.length > markerLength) {
      lastMarker.shift();
    }

    // Check if the lastMarker array contains only different characters
    if (lastMarker.length === markerLength && new Set(lastMarker).size === markerLength) {
      // If so, return the number of characters processed so far
      return i + 1;
    }
  }

  // If we reach here, no marker was found
  return -1;
}

// Example usage
console.log(findFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')); // 7
console.log(findFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')); // 5
console.log(findFirstMarker('nppdvjthqldpwncqszvftbrmjlhg')); // 6
console.log(findFirstMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')); // 10
console.log(findFirstMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')); // 11
console.log(findFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)); // 11


function part1(input) {
  return findFirstMarker(input);
}

function part2(input) {
  return findFirstMarker(input, 14);
}

part1(input); // ?
part2(input); // ?
