const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.get('/account', (req, res) => {
    const query = req.query;
    console.log(query);
    return res.json(["Name 1: Jamal", "Name 2: Patricia"]);
})

app.post('/account', (req, res) => {
    const { cpf, name } = req.body;

    const customerAlreadyExist = customers.some((customer) => customer.cpf === cpf);

    if(customerAlreadyExist) {
        return response.status(400).json({ error: "Customer already exists!" });
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    return response.status(201).send();

})

app.listen(3333); 