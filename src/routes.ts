import { Router } from "express";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";
import { SendMailController } from "./controllers/SendMailController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

//Users
router.get("/users", userController.get);
router.post("/users", userController.create);

//Surveys
router.get("/surveys/:id", surveyController.get);
router.get("/surveys", surveyController.getAll);
router.post("/surveys", surveyController.create);

//Mail
router.post("/sendmail", sendMailController.execute);
router.get("/sendmail/delete", sendMailController.deleteAll);

export { router };
