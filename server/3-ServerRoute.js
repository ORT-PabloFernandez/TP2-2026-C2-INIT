import http from 'http';

const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879 },
    { first: 'Isaac', last: 'Newton', year: 1643 },
    { first: 'Galileo', last: 'Galilei', year: 1564 },
    { first: 'Marie', last: 'Curie', year: 1867 },
    { first: 'Johannes', last: 'Kepler', year: 1571 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
    { first: 'Max', last: 'Planck', year: 1858 },
  ];


http.createServer((req, res) => {
    switch (req.url) {
        case "/":   
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h3>API de Inventores</h3>');            
            res.end();
            break;
        case "/api/inventor":
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(inventors, null, " "));
            console.log("Request envida con json de inventores");
            res.end();
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('<h1>404 Not Found</h1>');
            res.end();
            break;
    }  
}).listen(3000, "127.0.0.1", () => {
    console.log("Server is running on http://127.0.0.1:3000");
});