( function(){
	
	'use strict';

	var fs = require('fs');

	module.exports = function( rootPath ){
		return function(){
			var initArguments = arguments;

			var output = {};
			scanDirectory( __dirname + "/" + rootPath, output );
			return output;

			function requirePath( file, rootPath, output ){
				try{
					scanDirectory( rootPath + "/" + file, output );
				} catch( error ){
					// expensive to expect exceptions -- shouldn't matter during app load
					var module = require( rootPath + "/" + file );
					module.apply( module, initArguments );

					var moduleName = file.substr( 0, file.lastIndexOf('.') );
					output[moduleName] = module;
				}
			}

			function scanDirectory( rootPath, output ){
				fs.readdirSync( rootPath ).forEach( function( file ){
					requirePath( file, rootPath, output );
				});
			}

		}
	};

})();