module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/hooks/*.js',
      'features/step-definitions/**/*.js',
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-html/index.html',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com',
    },
  },
  smoke: {
    paths: ['features/smoke/**/*.feature'],
    require: [
      'features/hooks/*.js',
      'features/step-definitions/**/*.js',
    ],
    tags: '@smoke',
    format: [
      'progress-bar',
      'json:reports/smoke-report.json',
      'html:reports/smoke-html/index.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
  },
  regression: {
    paths: ['features/regression/**/*.feature'],
    require: [
      'features/hooks/*.js',
      'features/step-definitions/**/*.js',
    ],
    tags: '@regression',
    format: [
      'progress-bar',
      'json:reports/regression-report.json',
      'html:reports/regression-html/index.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
  },
};
