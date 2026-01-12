import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AddItemController } from "./controllers/order/AddItemController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAdmin } from "./middlewares/isAdmin";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { validateSchema } from "./middlewares/validateSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import {
  addItemSchema,
  createOrderSchema,
  detailOrderSchema,
  removeItemSchema,
  sendOrderSchema,
  finishOrderSchema
} from "./schemas/orderSchema";
import {
  createProductSchema,
  listProductByCategorySchema,
  listProductSchema,
} from "./schemas/productSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

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

// Rotas Products
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle
);

// Rotas Order
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle
);

router.delete("/order", isAuthenticated, new DeleteOrderController().handle)

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

// Buscar detalhes de uma order
router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle
);

// Adicionar item a order
router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemController().handle
);

// Remover item da order
router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemController().handle
);

router.put("/order/send", isAuthenticated, validateSchema(sendOrderSchema) ,new SendOrderController().handle);

router.put("/order/finish", isAuthenticated, validateSchema(finishOrderSchema) ,new FinishOrderController().handle)



export { router };

//Arquiterura em Camadas:
//  Routes - Controller - Service

//Controller >
//Service > Respondavel pela lógica por realizar as operações
