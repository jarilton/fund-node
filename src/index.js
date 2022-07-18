const {
    response,
    request
} = require('express');
const express = require('express');
const {
    v4: uuidv4
} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

//app.use(verifyIfExistAccountCPF);

//middleware
function verifyIfExistAccountCPF(req, res, next) {
    const {
        cpf
    } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({
            error: 'Customer not found'
        })
    }

    request.customer = customer;

    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    })
}


app.get('/statement', verifyIfExistAccountCPF, (req, res) => {
    const {
        customer
    } = req;

    return response.json(customer.statement);

})

app.get('/statement/date', verifyIfExistAccountCPF, (req, res) => {
    const {
        customer
    } = req;
    const {
        date
    } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())
    return response.json(statement);

})

app.post('/deposit', verifyIfExistAccountCPF, (req, res) => {
    const {
        description,
        amount
    } = req.body;

    const {
        customer
    } = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    };

    customer.statement.push(statementOperation);

    return res.status(201).send();
})

app.post('withdraw', verifyIfExistAccountCPF, (req, res) => {
    const {
        amount
    } = req.body;
    const {
        customer
    } = req;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({
            error: "insufficient funds!"
        })
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

app.post('/account', (req, res) => {
    const {
        cpf,
        name
    } = req.body;

    const customerAlreadyExist = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExist) {
        return response.status(400).json({
            error: "Customer already exists!"
        });
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