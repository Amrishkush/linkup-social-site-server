import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router()

userRouter.route("/register").post(
        upload.fields([
            {name:"avatar" , maxCount: 1},
            {name:"coverImage", maxCount: 1}
        ]),
        registerUser
)

userRouter.route("/login").post(loginUser)
userRouter.route("/current-user").get(verifyJWT, getCurrentUser)
userRouter.route("/logout").post(verifyJWT, logoutUser)



export {userRouter}   //If default then it can be imported as other name as it will be default for whole page.