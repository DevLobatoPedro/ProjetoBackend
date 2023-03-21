import { Router, json } from 'express';
import { clienteDelete, clienteIndex, clienteRegistration } from './controllers/ClientesController.js';
import { estoqueDelete, estoqueIndex, estoquePesq, estoqueStore, estoqueUpdate } from './controllers/EstoqueController.js';
import { lojaDelete, lojaIndex, lojaPesq, lojaStore, lojaUpdate } from './controllers/StoreController.js';

const router = Router()
router.use(json())

router.get('/store',lojaIndex)
.post('/store',lojaStore)
.delete('/store/:id',lojaDelete)
.put('/store/:id',lojaUpdate)
.get('/store/pesq/:cidade',lojaPesq)

router.get('/estoque',estoqueIndex)
.post('/estoque',estoqueStore)
.delete('/estoque/:id', estoqueDelete)
.put('/estoque/:id',estoqueUpdate)
.get('/estoque/pesq/:marca',estoquePesq)

router.get('/clientes',clienteIndex)
.post('/clientes',clienteRegistration)
//.delete('/clientes/:id'clienteDelete)





export default router