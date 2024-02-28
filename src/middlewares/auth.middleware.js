import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler (async (req , _ , next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") //"Bearer " this space is very important
     console.log(token)
        if(!token){
            console.log("token is missing")
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            console.error("Invalid Access Token: User not found");
            throw new ApiError(401, "Invalid Access Token");
        }
        console.log("User authenticated:", user);
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
}
)

