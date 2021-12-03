module.exports = function (w) {

  return {
    files: [
      {pattern: '/**/*.ts', load: false},
      {pattern: '/**/*.txt', load: false},
      '!/**/*.spec.ts'
    ],

    tests: [
      '/2018/**/*.spec.ts'
    ],

    env: {type: 'node'},


    testFramework: 'jasmine'
  };
};
