const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const routerApi = require('./routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
res.send("Bienvenido a la API. Mensaje por escribir.");
});

routerApi(app);

app.listen(PORT, ()=>{
console.log(`Listening on port ${PORT}`);
});
