import  express from 'express';

//importa o arquivo com as rotas do sistema
import routes from './routes';

import path from 'path';

import cors from 'cors';

import {errors} from 'celebrate';

//inicia a aplicação
const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

app.use(errors());

app.listen(3333);