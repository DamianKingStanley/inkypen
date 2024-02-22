import express from "express";
import auth from "../middleware/auth.js";
import {
    userRegister,
    login,
    getUserProfile,
    updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", login);
router.get("/user/profile", getUserProfile);
router.put("/user/profile/update", updateUserProfile);

export default router;