import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Doc Source: https://swagger.io/specification/#info-object
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Document Information Protection",
      description: "Works on the concept of Microsoft Information Protect, and apply the file security as per the Microsoft Labels and their defined Polices.",
      version: "v1.0",
      contact: {
        name: "Devesh Kumar",
        email: "deveshkumarsep12@outlook.com",
        url: "https://deveshkumar.online",
      },
      servers: [
        "http://localhost:80"
      ],
    },
    basePath: "/",
    schema: [
        "http", "https"
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./index.js", "./Routes/*.js", "./Routes/Authorization/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
