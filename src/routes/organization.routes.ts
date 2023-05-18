import { Router } from "express";

import { create } from "../controllers/organizations.controller";

const router = Router();

router.route("/organization/create").post(
    create
    /*
        #swagger.tags = ['Organization Routes']

        #swagger.security = [{
            "bearerAuth": []
        }]

        #swagger.responses[201-1] = {
            description: 'Organization Created Successfully',
            schema: {
                status: "success",
                data: '{Object containing createdOrganization Data}'
            }
        }

        #swagger.responses[400-1] = {
            schema: {
                status: "fail",
                message: 'Passwords dont match'
            },
            description: 'Passwords dont match'
        }

        #swagger.responses[400-2] = {
            schema: {
                status: "fail",
                message: 'You need to register using the organization email'
            },
            description: 'You need to register using the organization email'
        }

        #swagger.responses[500-1] = {
            description: 'Cant create the organization',
            schema: {
                status: "error",
                message: 'Cant create the organization'
            }
        }

        #swagger.responses[500-2] = {
            description: 'Cant find the organization',
            schema: {
                status: "error",
                message: 'Cant find the organization'
            }
        }

        #swagger.responses[500-3] = {
            description: 'Error getting the email domain',
            schema: {
                status: "error",
                message: 'Error getting the email domain'
            }
        }

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "organization": {
                                "$ref": "#/components/schemas/OrganizationSignUpSchema"
                            },
                            "admin": {
                                "$ref": "#/components/schemas/UserSignUpSchema"
                            }
                        },
                        "additionalProperties": false
                    }
                }
            }
        }
    */
);

export default router;
