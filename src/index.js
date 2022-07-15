const express = require('express');

const app = express();

app.get('/', (req, res) => {
<<<<<<< Updated upstream
    return res.json({ message: "Bem vindos ao curso de node js!!" });
=======
    return res.json({ message: "teste!!" });
>>>>>>> Stashed changes
})

app.listen(3306); // serve para startar a aplicação