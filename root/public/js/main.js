
var app = {

	initHome : function(){

		var socket = io.connect();
		socket.on( 'news', function( data ){
			console.log( "Getting a socket message", data );
			socket.emit( 'my other event', { my: 'data' } );
		});

	}

}

UTIL = {
	exec: function( controller, action ) {
		var ns = SITENAME,
		action = ( action === undefined ) ? "init" : action;

		if( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ){
			ns[controller][action]();
		}
	},

	init: function() {
		var body = document.body,
		controller = body.getAttribute( "data-controller" ),
		action = body.getAttribute( "data-action" );

		UTIL.exec( "common" );
		UTIL.exec( controller );
		UTIL.exec( controller, action );
	}
};

$( UTIL.init );