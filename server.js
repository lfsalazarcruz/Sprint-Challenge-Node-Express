const PORT = 5000;
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const server = express();

const projectRoutes = require('./projects/projectRoutes');
const actionRoutes = require('./actions/actionRoutes');

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use(cors());

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.listen(PORT, () => console.log( `API on port ${PORT}` ))