const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.get('/account', (req, res) =>{
    const query = req.query;
    console.log(query);
    return res.json(["Name 1: Jamal", "Name 2: Patricia"]);
})

app.post('/account', (req, res) => {
    const { cpf, name } = req.body;

    const id = uuidv4();

    customers.push({
        cpf,
        name,
        id,
        statement: [],
    });

    return response.status(201).send();

})

app.listen(3333); 