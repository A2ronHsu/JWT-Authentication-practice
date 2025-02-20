import { Router } from "express";
import AuthController from "./src/controllers/AuthController";


const router = Router();
const authController = new AuthController();

router.post("/auth", authController.execute );
router.post("/aut/refresh-token",authController.refresh);


export default router;