import { Router } from "express";
import { tokenChecker } from "../middleware/token_checker";
import { UsersController } from "../controllers/userController";

const router: Router = Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getAllUserData);
router.patch("/:id",tokenChecker, UsersController.updateUserData, UsersController.saveQuiz);
router.patch("/:id/addquiz", tokenChecker, UsersController.saveQuiz);

export { router as usersRouter };