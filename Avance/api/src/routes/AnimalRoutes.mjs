
import { Router } from 'express';
import { body } from "express-validator";
import { AnimalController } from '../controllers/AnimalController.mjs';

class AnimalRoutes {
    constructor(){
        this.router = Router();
        this.controller = new AnimalController();

        this.router
            .route("/")
            .get(this.controller.getAnimals)
            .post(
                [
                  body("id").trim().notEmpty(),
                  body("name").trim().notEmpty(),
                  body("species").trim().isNumeric(),
                ],
                this.controller.createAnimal
              );

        this.router
            .route("/:id")
            .put(this.controller.updateAnimal)
            .delete(this.controller.deleteAnimal);

    }
}
export {AnimalRoutes};

