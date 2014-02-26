/*
 * grunt-init-express-socketio
 *
 * Copyright (c) 2014 Joshua Kennedy
 * Licensed under the MIT license.
 */

'use strict';

exports.description = 'Scaffold Node.JS, Express, Socket.io, Mocha, JSHint.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
	'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
	'install_. After that, you may execute project tasks with _grunt_. For ' +
	'more information about installing and configuring Grunt, please see ' +
	'the Getting Started guide:' +
	'\n\n' +
	'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ){

	init.process( {type: 'node'}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('description'),
		init.prompt('version'),
		init.prompt('repository'),
		init.prompt('homepage'),
		init.prompt('bugs'),
		init.prompt('licenses'),
		init.prompt('author_name'),
		init.prompt('author_email'),
		init.prompt('author_url'),
		init.prompt('node_version', '>= 0.10.0'),
		init.prompt('js_module_name_space', 'MYAPP'),

	], function( err, props ){

		var files = init.filesToCopy( props );

		props.main = "app/app.js",

		props.scripts = {
			"start": "node app/app.js",
			"sup": "supervisor -e js,json,html app/app.js",
		};

		props.dependencies = {
			"express": "~3.4.8",
			"ejs": "~0.8.5",
			"underscore": "~1.6.0",
			"request": "~2.34.0",
			"socket.io": "~0.9.16",
			"socket.io-client": "~0.9.16",
			"async": "~0.2.10",
			"moment": "~2.5.1",
			"connect-flash": "~0.1.1",
			"colors": "~0.6.2"
		};

		props.devDependencies = {
			"grunt": "~0.4.2",
			"grunt-contrib-jshint": "~0.8.0",
			"grunt-contrib-watch": "~0.5.3",
			"grunt-contrib-less": "0.9.0",
			"grunt-contrib-concat": "0.3.0",
			"grunt-contrib-uglify": "0.3.2",
			"grunt-contrib-cssmin": "0.8.0",
			"mocha": "~1.17.0",
			"grunt-simple-mocha": "~0.4.0"
		};

		// Add properly-named license files.
		init.addLicenseFiles( files, props.licenses );

		// Actually copy (and process) files.
		init.copyAndProcess( files, props );

		// Generate package.json file.
		init.writePackageJSON( 'package.json', props );

		done();

	});

};
