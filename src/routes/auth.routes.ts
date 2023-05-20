import { Router } from "express";

import { login, signup } from "../controllers/auth.controller";

import { isLoggedIn } from "../middlewares/isLoggedIn.middleware";
import { orgExist } from "../middlewares/orgExist.middleware";

const router = Router();

router.route("/:organization/auth/login").post(
    orgExist,
    login
    /*
        #swagger.tags = ['Auth Routes']

        #swagger.responses[201-1] = {
            description: 'User Logined Successfully',
            schema: {
                status: "success",
                token: 'token'
            }
        }

        #swagger.responses[400-1] = {
            schema: {
                status: "fail",
                message: 'Password is not correct'
            },
            description: 'Password is not correct'
        }

        #swagger.responses[400-2] = {
            schema: {
                status: "fail",
                message: 'User not found'
            },
            description: 'User not found'
        }

        #swagger.responses[500-1] = {
            description: 'Cant login the user',
            schema: {
                status: "error",
                message: 'Cant login the user'
            }
        }

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UserLoginSchema" },
                }
            }
        }
    */
);

router.route("/:organization/auth/signup").post(
    orgExist,
    signup
    /*
        #swagger.tags = ['Auth Routes']

        #swagger.responses[201-1] = {
            description: 'User Registered Successfully',
            schema: {
                status: "success",
                token: 'token'
            }
        }

        #swagger.responses[400-1] = {
            schema: {
                status: "fail",
                message: 'You need to register using the organization email'
            },
            description: 'You need to register using the organization email'
        }

        #swagger.responses[500-1] = {
            description: 'Cant signup the user',
            schema: {
                status: "error",
                message: 'Cant signup the user'
            }
        }

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UserSignUpSchema" },
                }
            }
        }
    */
);

router.route("/:organization/auth/validate-token").post(
    orgExist,
    isLoggedIn,
    (req, res) => {
        res.status(200).json({
            status: "valid"
        });
    }
    /*
        #swagger.tags = ['Auth Routes']

        #swagger.description = 'User needs to be logged in'

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[200-1] = {
            description: 'Token is valid',
            schema: {
                status: "valid"
            }
        }

        #swagger.responses[401-1] = {
            schema: {
                status: "invalid"
            },
            description: 'Token is invalid'
        }

        #swagger.responses[401-2] = {
            schema: {
                status: "fail",
                message: 'Please Log In!'
            },
            description: 'Please Log In!'
        }
    */
);

export default router;
