import fs from "fs";
const path = "./inventors.json";

const inventors =  JSON.parse(fs.readFileSync(path, "utf-8"));

const inventor = {
    id: 8,
    fisrt: "Juana",
    last: "Gonzales",
    year: 1987
}

inventors.push(inventor);

fs.writeFileSync(path, JSON.stringify(inventors, null, "   " ));

console.log(inventors);
