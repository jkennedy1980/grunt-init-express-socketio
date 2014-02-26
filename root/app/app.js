/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

var express = require('express');
var app = express();
var server = require('http').createServer( app );
var _ = require('underscore');
var flash = require('connect-flash');
var colors = require('colors');
var sockets = require('../lib/app-sockets.js');

var port = process.env.PORT || 80;

app.configure( 'development', 'test', function(){

});

app.configure( 'production', function(){

});

app.get( "/", function( req, res ){
	res.render('index.html');
});


// WEB SERVER FOR STATICISH CONTENT
app.use( express.static( __dirname + "/../public" ), { maxAge: 30 } );
app.use( express.static( __dirname + "/../public/images"), { maxAge: 4*3600*24 }  );
app.set( 'views', __dirname + '/../views' );
app.engine( 'html', require('ejs').renderFile );

// FLASH MESSAGES
app.use( express.cookieParser() );
app.use( express.cookieSession( { secret: "topsecret" } ) );
app.use( flash() );

app.use( express.bodyParser() );
app.use( app.router );


// START SOCKET.IO
sockets.init( server );


// FINAL INITIALIZATION
console.log( 'Starting {%= name %}'.yellow );

server.on( 'close', function(){
    console.log( 'Stopping {%= name %}'.red );
});

server.listen( port );
console.log( '{%= name %} started'.green );