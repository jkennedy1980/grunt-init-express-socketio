( function(){

	var io = false;

	exports.init = function( server ){

		io = require('socket.io').listen( server );
		io.set( 'log level', 1 );

		io.sockets.on( 'connection', function( socket ){
			socket.on( 'disconnect', exports.socketDisconnection( socket ) );
			exports.socketConnection( socket );
		});

	}

	exports.socketConnection = function( socket ){
		console.log( "Socket connected" );

		socket.on( 'testMessage', function( data ){
			socket.emit( 'testResponse', { "message" : "Sockets are working!" } );
		});
	};

	exports.socketDisconnection = function( socket ){
		return function(){

			console.log( "Socket Disconnected" );

		}
	};

})();
