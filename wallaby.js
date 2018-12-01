module.exports = function (w) {

  return {
    files: [
      {pattern: '2018/**/*.ts', load: false},
      {pattern: '2018/**/*.txt', load: false},
      '!2018/**/*.spec.ts'
    ],

    tests: [
      '2018/**/*.spec.ts'
    ],

    env: {type: 'node'},


    testFramework: 'jasmine'
  };
};