const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`CloudNotes backend listening on port http://localhost:${port}`);
})
