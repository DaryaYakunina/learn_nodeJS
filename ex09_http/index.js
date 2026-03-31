import {createServer} from 'node:http';

// Create a local server to receive data from
const server = createServer((req, res) => {

    console.log('req.headers:', req.headers);

    res.writeHead(200, 
        { 'Content-Type': 'text/html', //'application/json'
          'My-Custom-Header-89': 'My Custom Header Value'
        });

    res.end (
        <b>Hello from Nodejs server</b>
        <form action='/some/endpoint'>
        <span>Enter your name:</span>
        <input type="text" name="username"></input>
        <button type="submit">send</button>
        </form>
);

    // res.end(JSON.stringify({
    // data: 'Hello World!',
    // }));
});

server.listen(3000);