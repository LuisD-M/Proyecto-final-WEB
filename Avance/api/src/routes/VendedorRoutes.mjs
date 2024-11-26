import { Router } from 'express';
import { body } from 'express-validator';
import { VendedorController } from '../controllers/VendedorController.mjs';

class VendedorRoutes {
    constructor() {
        this.router = Router();
        this.controller = new VendedorController();

        this.router
            .route('/')
            .get(this.controller.getVendedores)
            .post(
                [
                    body('name').trim().notEmpty(),
                    body('lastname').trim().notEmpty(),
                    body('phone').trim().optional().isNumeric(),
                    body('company').trim().optional().notEmpty(),
                ],
                this.controller.createVendedor
            );

        this.router
            .route('/:id')
            .put(this.controller.updateVendedor)
            .delete(this.controller.deleteVendedor);
    }
}

export { VendedorRoutes };