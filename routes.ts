import { Router } from "express";
import AuthController from "./src/controllers/AuthController";


const router = Router();
const authController = new AuthController();

router.post("/auth", authController.execute );
router.post("/auth/refresh-token",authController.refresh);
router.post("/add",authController.add);
router.get("/get",authController.get);


export default router;