const express=require('express')
const authcontroller=require("../controllers/auth.controller")
const authRouter=express.Router()
const authMiddleware=require("../middlewares/auth.middleware")
/**
 * @route POST api/auth/register
 * @description Register a user
 * @access Public
 */
authRouter.post("/register",authcontroller.registerUserController)


/**
 * 
 * @route POST api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login",authcontroller.loginUserController)



/**
 * @route GET api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",authcontroller.logoutUserController)
 
/**
 * @route GET api/auth/get-me
 * @description Get the logged in user's details, expecting token in the cookie
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authcontroller.getMeController)
module.exports=authRouter