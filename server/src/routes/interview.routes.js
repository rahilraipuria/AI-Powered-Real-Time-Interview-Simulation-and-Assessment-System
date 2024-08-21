import {Router} from "express";
import { scheduleInterview,getScheduledInterviews,getCompletedInterviews,getPendingInterviews } from "../controllers/interview.controller.js";
//import {verifyJWT} from "../middlewares/auth.middleware.js";

const router=Router()
router.route("/newInterview").post(scheduleInterview)
router.route("/getScheduledInterviews").get(getScheduledInterviews)
router.route("/getCompletedInterviews").get(getCompletedInterviews)
router.route("/getPendingInterviews").get(getPendingInterviews)


export default router