import express from 'express';
import chalk from 'chalk';

const PORT = 3000;

const app = express();

const inventors = [
    { _id: 1, first: 'Albert', last: 'Einstein', year: 1879 },
    { _id: 2, first: 'Isaac', last: 'Newton', year: 1643 },
    { _id: 3, first: 'Galileo', last: 'Galilei', year: 1564 },
    { _id: 4, first: 'Marie', last: 'Curie', year: 1867 },
    { _id: 5, first: 'Johannes', last: 'Kepler', year: 1571 },
    { _id: 6, first: 'Nicolaus', last: 'Copernicus', year: 1473 },
    { _id: 7, first: 'Max', last: 'Planck', year: 1858 },
  ];

app.get('/', (req, res) => {
    res.send('<h3>API de Inventores</h3>');
});

app.get('/api/inventor', (req, res) => {
    res.json(inventors);        
    console.log("Request enviada con json de inventores");
});

app.get('/api/inventor/:id', (req, res) => {
    const inventorId = parseInt(req.params.id);
    console.log("Request enviada con json de inventores por id: " + inventorId);
    const inventor = inventors.find(inventor => inventor._id === inventorId);
    if(!inventor) {
        return res.status(404).json({ error: 'Inventor no encontrado' });
    }
    res.json(inventor);
}
);

app.listen(PORT, () => {
    console.log(chalk.green(`Servidor Express corriendo en el puerto ${PORT}`));
});