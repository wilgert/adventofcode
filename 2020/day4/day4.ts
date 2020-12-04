import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string) =>
  rawInput.split("\n\n").map((passportString) =>
    passportString
      .split(/\s/)
      .filter((field) => field)
      .reduce((passport, field) => {
        const [fieldName, fieldValue] = field.split(":");
        return { ...passport, [fieldName]: fieldValue };
      }, {})
  );

const input = prepareInput(readFile(__dirname + "/input.txt"));
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function minMaxValidator(value: string, min: number, max: number) {
  const parsed = parseInt(value);
  return parsed >= min && parsed <= max;
}

const validators: { [key: string]: (value: string) => boolean } = {
  byr: (value) => {
    return minMaxValidator(value, 1920, 2002);
  },
  iyr(value) {
    return minMaxValidator(value, 2010, 2020);
  },
  eyr: (value) => {
    return minMaxValidator(value, 2020, 2030);
  },
  hgt: (value) => {
    const [, height, type] = value.match(/(\d{2,3})(cm|in)/) ?? [];
    switch (type) {
      case "cm":
        return minMaxValidator(height, 150, 193);
      case "in":
        return minMaxValidator(height, 59, 76);
      default:
        return false;
    }
  },
  hcl: (value) => /#[0-9a-f]{6}/.test(value),
  ecl: (value) => /amb|blu|brn|gry|grn|hzl|oth/.test(value),
  pid: (value) => /^[0-9]{9}$/.test(value),
};

function validateFields(
  passports,
  validatorFn: (requiredField, passport) => boolean
) {
  return passports.reduce(
    (validPassports: number, passport) =>
      requiredFields.every((requiredField) =>
        validatorFn(requiredField, passport)
      )
        ? validPassports + 1
        : validPassports,
    0
  );
}

const goA = (passports): number => {
  return validateFields(
    passports,
    (requiredField, passport) => passport[requiredField] !== undefined
  );
};

const goB = (passports) => {
  return validateFields(passports, (requiredField, passport) => {
    const value = passport[requiredField];
    const validator = validators[requiredField];
    return value !== undefined && validator(value);
  });
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
