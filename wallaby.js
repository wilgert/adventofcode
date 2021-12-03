module.exports = function (w) {

  return {
    files: [
      {pattern: '/**/*.ts', load: false},
      {pattern: '/**/*.txt', load: false},
      '!/**/*.spec.ts'
    ],

    tests: [
      '/2021/**/*.spec.ts'
    ],

    env: {type: 'node'},


    testFramework: 'jasmine'
  };
};
