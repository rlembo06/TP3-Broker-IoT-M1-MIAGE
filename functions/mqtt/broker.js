const mosca = require('mosca');

var server = new mosca.Server({
    port: 1883
});

server.on('ready', function(){
    console.log("ready");
});