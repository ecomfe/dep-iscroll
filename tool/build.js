#!/usr/bin/env node
var fs = require( 'fs' );
var path = require( 'path' );

function addWrapper( srcFile, distFile ) {
    var tplHeader = 'define(function(require, exports, module) {\n\n';
    var tplFooter = '\n});\n';
    var str = fs.readFileSync( srcFile, {
        encoding: 'UTF-8'
    });

    str = tplHeader + str + tplFooter;
    fs.writeFileSync( distFile, str, {
        encoding: 'UTF-8'
    });
}

function main() {
    var srcPath = '../src';
    var distPath = '../dist';
    var files = fs.readdirSync( srcPath );

    console.log( 'add wrapper...' );

    files.forEach(function( file ) {
        if ( path.extname( file ) === '.js' ) {
            var srcFile = path.resolve(__dirname, srcPath, file);
            var distFile = path.resolve(__dirname, distPath, file);
            addWrapper( srcFile, distFile );
        }
    });

    console.log( 'done.' );
}

main();
