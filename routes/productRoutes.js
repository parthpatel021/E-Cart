import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { 
    createProductController, 
    deleteProductController, 
    filterProductController,
    getProductController, 
    getSingleProductController, 
    productCountController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchController, 
    updateProductController 
} from './../controllers/productController.js';

const router = express.Router();

// Routes

// Create-Product || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get products || GET
router.get("/get-product", getProductController);

//single product || GET
router.get("/get-product/:slug", getSingleProductController);

//get photo || GET
router.get("/product-photo/:pid", productPhotoController);

//delete product || DELETE
router.delete("/delete-product/:pid", deleteProductController);

// update-Product || PUT
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// Filter product || POST
router.post('/product-filters' ,filterProductController);

// Product Count || GET
router.get('/product-count', productCountController);

// Product per page || GET
router.get('/product-list/:page', productListController);

// Search product || GET
router.get('/search/:keyword', searchController);

// Similar Product || GET
router.get('related-product/:pid/:cid', relatedProductController);

export default router;