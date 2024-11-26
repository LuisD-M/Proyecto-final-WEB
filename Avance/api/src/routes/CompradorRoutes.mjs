import { Router } from 'express';
import { body } from 'express-validator';
import { CompradorController } from '../controllers/CompradorController.mjs';

class CompradorRoutes {
    constructor() {
        this.router = Router();
        this.controller = new CompradorController();

        this.router
            .route('/')
            .get(this.controller.getCompradores)
            .post(
                [
                    body('name').trim().notEmpty(),
                    body('lastname').trim().notEmpty(),
                    body('phone').trim().optional().isNumeric(),
                    body('company').trim().optional().notEmpty(),
                ],
                this.controller.createComprador
            );

        this.router
            .route('/:id')
            .put(this.controller.updateComprador)
            .delete(this.controller.deleteComprador);
    }
}

export { CompradorRoutes };