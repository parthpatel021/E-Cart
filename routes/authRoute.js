import express from "express";
import {
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

// routing

// Register || POST
router.post('/register', registerController);

// Login || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// Test
router.get('/test',requireSignIn, isAdmin, testController);

// Protected user route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Protected Admin route Auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// Update Profile
router.put('/profile', requireSignIn, updateProfileController);

// Orders - User
router.get('/orders', requireSignIn, getOrdersController);

// All Orders - Admin
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// Order Status Update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;