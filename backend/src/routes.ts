import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
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
import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router();
const upload = multer(uploadConfig);

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

//rotas products
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single('file'),
  new CreateProductController().handle
);

export { router };

//Arquiterura em Camadas:
//  Routes - Controller - Service

//Controller >
//Service > Respondavel pela lógica por realizar as operações
