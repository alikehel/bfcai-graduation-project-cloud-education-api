import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "1.0.0", // by default: '1.0.0'
        title: "Cloud Education", // by default: 'REST API'
        description:
            "A Complete Education System on the cloud that aims to be a replacement for the traditional offline school or university education." // by default: ''
    },
    host: "", // by default: 'localhost:3000'
    basePath: "/api/v1/", // by default: '/'
    schemes: [], // by default: ['http']
    consumes: [], // by default: ['application/json']
    produces: [], // by default: ['application/json']
    tags: [
        // by default: empty Array
        {
            name: "", // Tag name
            description: "" // Tag description
        }
        // { ... }
    ],
    securityDefinitions: {}, // by default: empty object
    definitions: {}, // by default: empty object (Swagger 2.0)
    components: {} // by default: empty object (OpenAPI 3.x)
};

const outputFile = "./src/swagger/swagger-output.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
