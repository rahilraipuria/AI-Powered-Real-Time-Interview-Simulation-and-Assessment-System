import {Router} from "express";
import { registerUser,loginUser, logoutUser, userDetails, experts, candidates, updateProfile, refreshAccessToken } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getUserInfo").get(verifyJWT,userDetails)
router.route("/getListOfExperts").get(experts)
router.route("/getListOfCandidates").get(candidates)
router.route("/updateProfile").post(updateProfile)
router.route("/refreshAccessToken").get(refreshAccessToken)
export default router