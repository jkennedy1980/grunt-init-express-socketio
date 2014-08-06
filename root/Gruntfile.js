'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				browser: true,
				globals: {
					jQuery: true
				}
			},
			all: {
				files: {
					src: ['public/js/main.js']
				}
			}
		},

		less: {
			dev: {
				files: {
					'public/css/main.css': 'less/main.less'
				}
			},
			production: {
				options: {
					cleancss: true,
					report: 'gzip'
				},
				files: {
					'public/css/main.css': 'less/main.less'
				}
			}
		},

		concat: {
			js: {
				src: [
					'public/js/bootstrap.min.js',
					'public/js/main.js'
					// Not including jQuery because it will mostly come from the CDN and we don't want to download it twice
				], 
				dest: 'public/js/main.concat.js'
			},
			css: {
				src: [
					'public/css/bootstrap.min.css',
					'public/css/bootstrap-theme.min.css',
					'public/css/main.css'
				],
				dest: 'public/css/main.concat.css'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			js: {
				files: {
					'public/js/main.min.js': ['public/js/main.concat.js']
				}
			}
		},

		cssmin: {
			css: {
				src: "public/css/main.concat.css",
				dest: "public/css/main.min.css"
			}
		},

		eslint: {
			options: {
				rulesdir: ['config/eslint-rules']
			},
			nodeFiles: {
				files: {
					src: ['routes/**/*.js', 'lib/**/*.js', 'apps/**/*.js']
				},
				options: {
					config: "config/eslint-node.json"
				}
			},
			browserFiles: {
				files: {
					src: ['public/js/**/*.js']
				},
				options: {
					config: "config/eslint-browser.json"
				}
			}
		},

		simplemocha: {
			all: { src: 'test/**/*-test.js' }
		},

		watch: {
			client_js: {
				files: ['public/js/main.js'],
				tasks: ['jshint','concat:js','uglify'],
			},
			less: {
				files: 'less/**/*.less',
				tasks: ['less','concat:css','cssmin:css'],
			}
		},

	});

  	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-simple-mocha' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-eslint' );

	grunt.registerTask( 'deploy', ['jshint', 'less', 'concat', 'uglify', 'cssmin']);
	grunt.registerTask( 'default', ['jshint', 'less', 'concat', 'uglify', 'cssmin', 'watch']);
	grunt.registerTask( 'test', ['simplemocha']);

};