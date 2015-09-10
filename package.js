Package.describe({
  summary: "A simple namespacing pattern for global helpers",
  version: "0.1.0",
  name: "anti:helpers",
  git: "https://github.com/anticoders/meteor-helpers.git"
});

Package.onUse(function (api) {
  api.addFiles('helpers.js');
});
