module.exports = function (w) {

  return {
    files: [
      {pattern: '/2023/**/*.ts', load: false},
      {pattern: '/common/**/*.ts', load: false},
      {pattern: '/**/*.txt', load: false},
      '!/**/*.spec.ts'
    ],

    tests: [
      '/2023/**/*.spec.ts'
    ],

    env: {type: 'node'},


    testFramework: 'jasmine'
  };
};
