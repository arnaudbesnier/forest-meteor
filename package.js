Package.describe({
  name: 'arnaudbesnier:forest',
  version: '0.0.2',
  summary: 'Meteor liana for Forest',
  git: 'https://github.com/arnaudbesnier/forest-meteor',
  documentation: 'README.md'
});

Npm.depends({
  "jsonapi-serializer": "3.0.2",
  "superagent": "2.0.0-alpha.1",
  "underscore": "1.8.3"
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('iron:router@1.0.12', 'server');
  api.addFiles('services/apimaps.js', 'server');
  api.addFiles('services/resources-getter.js', 'server');
  api.addFiles('services/resource-creator.js', 'server');
  api.addFiles('services/resource-remover.js', 'server');
  api.addFiles('services/resource-updater.js', 'server');
  api.addFiles('utils/CORS.js', 'server');
  api.mainModule('forest.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('iron:router@1.0.12', 'server');
  api.use('arnaudbesnier:forest');
  api.mainModule('forest-tests.js', 'server');
});
