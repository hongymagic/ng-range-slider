'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	var jshintrc = grunt.file.readJSON('.jshintrc');
	jshintrc.reporter = require('jshint-stylish');

	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),

		files: {
			grunt: 'Gruntfile.js',
			src: ['src/**/*.js'],
			test: ['test/**/*.spec.js']
		},

		jshint: {
			options: jshintrc,
			all: ['<%= files.grunt %>', '<%= files.src %>', '<%= files.test %>']
		},

		karma: {
			unit: {
				configFile: 'karma.unit.conf.js',
				singleRun: true
			},

			debug: {
				configFile: 'karma.unit.conf.js',
				browsers: ['Chrome']
			},

			continuous: {
				configFile: 'karma.unit.conf.js',
				singleRun: true,
				reporters: ['teamcity']
			}
		},

		concat: {
			options: {
				stripBanners: true,
				separator: ';'
			},
			dist: {
				src: ['<%= files.src %>'],
				dest: 'ng-range-slider.js'
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'ng-range-slider.min.js': ['ng-range-slider.js']
				}
			}
		},

		lintspaces: {
			all: {
				src: ['<%= jshint.all %>'],
				options: {
					editorconfig: '.editorconfig'
				}
			}
		},

		watch: {
			scripts: {
				files: ['<%= jshint.all %>'],
				tasks: ['default']
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'lintspaces', 'concat', 'uglify']);
	grunt.registerTask('debug', ['jshint', 'lintspaces', 'karma:debug']);
	grunt.registerTask('build', ['jshint', 'karma:continuous', 'concat', 'uglify']);
};
