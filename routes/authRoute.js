import express from "express";
import {registerController, loginController, testController} from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

// routing

// Register || POST
router.post('/register', registerController);

// Login || POST
router.post('/login', loginController);

// Test
router.get('/test',requireSignIn, isAdmin, testController);

export default router;