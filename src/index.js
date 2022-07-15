const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: "Bem vindos ao curso de node js!!" });
})

app.listen(3306); // serve para startar a aplicação