// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-02-05 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-rt-popup/dist/angular-rt-popup.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/waypoints/lib/noframework.waypoints.min.js',
      'app/bower_components/SHA-1/sha1.js',
      'app/bower_components/angulartics/src/angulartics.js',
      'app/bower_components/angulartics/src/angulartics-clicky.js',
      'app/bower_components/angulartics/src/angulartics-cnzz.js',
      'app/bower_components/angulartics/src/angulartics-ga-cordova.js',
      'app/bower_components/angulartics/src/angulartics-gtm.js',
      'app/bower_components/angulartics/src/angulartics-piwik.js',
      'app/bower_components/angulartics/src/angulartics-scroll.js',
      'app/bower_components/angulartics/src/angulartics-splunk.js',
      'app/bower_components/angulartics/src/angulartics-woopra.js',
      'app/bower_components/angulartics/src/angulartics-marketo.js',
      'app/bower_components/angulartics/src/angulartics-intercom.js',
      'app/bower_components/angulartics/src/angulartics-inspectlet.js',
      'app/bower_components/angulartics/src/angulartics-newrelic-insights.js',
      'app/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/quantumui/dist/js/quantumui.js',
      'app/bower_components/ui-router-extras/release/ct-ui-router-extras.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
