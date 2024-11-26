import { Router } from 'express';
import { body } from 'express-validator';
import { DuenoController } from '../controllers/DueñoController.mjs';

class DuenoRoutes {
    constructor() {
        this.router = Router();
        this.controller = new DuenoController();

        this.router
            .route('/')
            .get(this.controller.getDuenos)
            .post(
                [
                    body('name').trim().notEmpty(),
                    body('lastname').trim().notEmpty(),
                    body('phone').trim().optional().isNumeric(),
                ],
                this.controller.createDueno
            );

        this.router
            .route('/:id')
            .put(this.controller.updateDueno)
            .delete(this.controller.deleteDueno);
    }
}

export { DuenoRoutes };