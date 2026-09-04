import express from 'express';
import chalk from 'chalk';

const PORT = 3000;
const app = express();

app.use("/", (req, res, next) => {
   if(req.query.token === "123456") {
        console.log("Token válido, acceso permitido");
        next();
   } else {
        console.log("Token inválido, acceso denegado");
        res.status(403).send("Acceso denegado: Token inválido");
   }
});

app.get('/', (req, res) => {
    res.send('<h3>API de Inventores</h3>');
});


app.listen(PORT, () => {
    console.log(chalk.green(`Servidor Express corriendo en el puerto ${PORT}`));
});