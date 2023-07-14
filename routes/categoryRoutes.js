import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js'
import { CategoryController, CreateCategoryController, SingleCategoryController, UpdateCategoryController, deleteCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// routes

// Create Category || POST
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController);

// update Category || PUT
router.put('/update-category/:id', requireSignIn, isAdmin, UpdateCategoryController);

// getAll Category || GET
router.get('/get-category', CategoryController);

// single Category || GET
router.get('/single-category/:slug', SingleCategoryController);

// Delete Category || delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;