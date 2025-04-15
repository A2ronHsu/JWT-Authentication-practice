import { Request, Response, Router } from "express";
import AuthController from "./src/controllers/AuthController";
import { AuthMiddleware } from "./src/midlewares/AuthMiddlewares";
<<<<<<< HEAD
import { PermissionMiddleware } from "./src/midlewares/PermissionMiddlewares";

=======
>>>>>>> 638ecc07434c516a6c8bff72daadc25a817be3a7

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