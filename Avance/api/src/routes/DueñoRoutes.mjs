import { Router } from 'express';
import { body } from 'express-validator';
import { DueñoController } from '../controllers/DueñoController.mjs';

class DueñoRoutes {
    constructor() {
        this.router = Router();
        this.controller = new DueñoController();

        this.router
            .route('/')
            .get(this.controller.getDueños)
            .post(
                [
                    body('name').trim().notEmpty(),
                    body('lastname').trim().notEmpty(),
                    body('phone').trim().optional().isNumeric(),
                ],
                this.controller.createDueño
            );

        this.router
            .route('/:id')
            .put(this.controller.updateDueño)
            .delete(this.controller.deleteDueño);
    }
}

export { DueñoRoutes };