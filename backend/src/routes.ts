import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAdmin } from "./middlewares/isAdmin";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { validateSchema } from "./middlewares/validateSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";

const router = Router();

// Rotas users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Category
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

export { router };


//Arquiterura em Camadas:
//  Routes - Controller - Service

//Controller >
//Service > Respondavel pela lógica por realizar as operações