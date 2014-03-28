// Karma configuration

module.exports = function (config) {
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'components/angular/angular.js',
			'components/angular-mocks/angular-mocks.js',
			'src/**/*.js',
			'test/**/*.spec.js'
		],

		exclude: [],

		reporters: ['dots', 'coverage'],

		port: 9876,

		colors: true,

		// LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_WARN,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		captureTimeout: 60000,

		singleRun: false,

		plugins: [
			'karma-jasmine',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-teamcity-reporter'
		]
	});
};