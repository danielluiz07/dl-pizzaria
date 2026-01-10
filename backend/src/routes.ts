import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema} from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router()

//Rotas users
router.post("/users", validateSchema(createUserSchema) ,new CreateUserController().handle)

router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle)

router.get("/me", isAuthenticated , new DetailUserController().handle)

//Rota Category
router.post("/category", isAuthenticated, isAdmin, new CreateCategoryController().handle)

export { router }

//Arquiterura em Camadas:
//  Routes - Controller - Service

//Controller >
//Service > Respondavel pela lógica por realizar as operações