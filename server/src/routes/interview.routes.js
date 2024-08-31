import {Router} from "express";
import { scheduleInterview,getScheduledInterviews,getCompletedInterviews,getPendingInterviews, interviewComplete, evaluateInterview } from "../controllers/interview.controller.js";
//import {verifyJWT} from "../middlewares/auth.middleware.js";
//import { upload } from "../middlewares/multer.middleware.js";
const router=Router()
router.route("/newInterview").post(scheduleInterview)
router.route("/getScheduledInterviews").get(getScheduledInterviews)
router.route("/getCompletedInterviews").get(getCompletedInterviews)
router.route("/getPendingInterviews").get(getPendingInterviews)
router.route("/interviewComplete").post(interviewComplete)
router.route("/evaluateInterview").post(evaluateInterview)

export default router