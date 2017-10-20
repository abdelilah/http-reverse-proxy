#! /usr/bin/env node

const program = require('commander')
const http = require('http')
const httpProxy = require('http-proxy');

program
    .version('0.0.1')
    .usage('[options] [URL]')
    .option('-p, --port [number]', 'Port number [4000]', '4000')
    .parse(process.argv);


if(program.args.length < 1){
    console.error('Missing URL argument.')
    process.exit()
}

const port = Number(program.port)
const proxy = httpProxy.createProxyServer();


const server = http.createServer(function(req, res) {
    proxy.web(req, res, { target: program.args[0] });
});

server.listen(port, (err) => {
    if (err) {
      return console.error('Something bad happened', err)
    }
    console.log(`Server is listening on port ${port}`)
})