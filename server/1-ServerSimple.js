import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hola mundo 3!</h1>');
    console.log("Request recibida");
    res.end();
}).listen(3000, "127.0.0.1", () => {
    console.log("Server is running on http://127.0.0.1:3000");
});

