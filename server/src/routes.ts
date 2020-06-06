//importando as bibliotecas 
import  express, { request } from 'express';
import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

//importando as controllers
import PointsController from './controllers/PointController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Itens
routes.get('/items',itemsController.index);


//Points
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(), // Joi.string().regex() pode se usar para validar se tem , e numeros na string
        })
    },{
        abortEarly: false, // configura a verificação para mostrar todos os parametros que estão incorretos 
    }), 
    pointsController.create
);

routes.get('/points/:id',pointsController.show);

routes.get('/points',pointsController.index);

export default routes;