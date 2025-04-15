import { Request, Response, Router } from "express";
import AuthController from "./src/controllers/AuthController";
import { AuthMiddleware } from "./src/midlewares/AuthMiddlewares";
import { PermissionMiddleware } from "./src/midlewares/PermissionMiddlewares";

const router = Router();
const authController = new AuthController();

router.post("/auth", authController.execute );
router.post("/auth/refresh-token",authController.refresh);
router.post("/add",authController.add);
router.get("/get",authController.get);
router.get("/users", AuthMiddleware, (Req:Request, Res:Response )=>{
   console.log("request received on /users");
   Res.json({Headers: Res.getHeaders(), sucess: true});
})

router.get("/admin/project", AuthMiddleware, PermissionMiddleware(id_usuario, "project", ['getAll']));
export default router;