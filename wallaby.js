module.exports = function (w) {

  return {
    files: [
      {pattern: '/**/*.ts', load: false},
      {pattern: '/**/*.txt', load: false},
      '!/**/*.spec.ts'
    ],

    tests: [
      '/**/*.spec.ts'
    ],

    env: {type: 'node'},


    testFramework: 'jasmine'
  };
};
