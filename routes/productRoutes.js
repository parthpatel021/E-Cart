import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from './../controllers/productController.js';

const router = express.Router();

// Routes

// Create-Product || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

// update-Product || POST
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);


export default router;