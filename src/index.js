const { response, request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

//middleware
function verifyIfExistAccountCPF(req, res, next) {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' })
    }

    request.customer = customer;

    return next();
}


app.get('/statement', verifyIfExistAccountCPF, (req, res) => {
    const { customer } = req; 

    return response.json(customer.statement);

})

app.post('/account', (req, res) => {
    const { cpf, name } = req.body;

    const customerAlreadyExist = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExist) {
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

app.listen(3306); 