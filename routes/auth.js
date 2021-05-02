const {Router} = require("express");

const {signUp, login, logout,isLoggedIn,emailverification,resendemailverification,passwordreset,validPasswordToken,newPassword,updatePassword} = require("../controllers/auth");
const {requireAuthentication,validateJson} = require("../middleware");
//const nodemailer = require("nodemailer");
//const Token = require("../models/User/token");

const router = Router();

/**
 * @swagger
 *
 * /auth/signup:
 *  post:
 *    summary: Sign up a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              password:
 *                type: string
 *
 *    responses:
 *      '200':
 *        description: success
 */
router.post("/signup", [
  validateJson({
    required: ["email", "password", "firstName", "lastName", "companyName"],
    properties: {
      email: {type: "string", format: "email"},
      password: {type: "string", minLength: 6, maxLength: 20},
      firstName: {type: "string", minLength: 2, maxLength: 30},
      lastName: {type: "string", minLength: 2, maxLength: 30},
      companyName: {type: "string", minLength: 3, maxLength: 30}
    }
  }),signUp]);

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    summary: Login as an existing user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *
 *    responses:
 *      '200':
 *        description: success
 */

//token confirmation

router.get('/confirmation/:token',[emailverification]);
router.get('/passwordtoken/:token1',[validPasswordToken]);

router.post("/resendemailverification", [
  validateJson({
    required: ["email"],
    properties: {
      email: {type: "string", format: "email"}
    }
  }),resendemailverification]);
router.post("/passwordreset",[
  /*validateJson({
    required:["email"],
    properites:{
      email:{type:"string", format:"email"}
    }
  }),*/passwordreset]);

router.post('/newpassword',[newPassword]);

router.post("/login", [
  validateJson({
    required: ["email", "password"],
    properties: {
      email: {type: "string", format: "email"},
      password: {type: "string"}
    }
  }),
  login
]);

router.get('/updatePassword',[requireAuthentication,updatePassword])
router.get('/isLoggedIn',[requireAuthentication,isLoggedIn]);
router.get('/logout',[requireAuthentication,logout]);

module.exports = router;
