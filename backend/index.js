const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  credentials: true, origin: 'http://localhost:3000',
}));

app.use(express.static('public'));

const UserRoutes = require('./routers/UserRoutes');

app.use('/users', UserRoutes);

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
