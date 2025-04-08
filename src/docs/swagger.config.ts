import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Login API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginResponseDTO: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        RegisterResponseDTO: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            name: {
              type: "string",
              example: "Joao Silva",
            },
            email: {
              type: "string",
              example: "joao@example.com",
            },
          },
        },
        UserResponseDTO: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            name: {
              type: "string",
              example: "Joao Silva",
            },
            email: {
              type: "string",
              example: "joao@example.com",
            },
            cpf: {
              type: "string",
              example: "***.123.456-78",
            },
          },
        },
        UserListResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/UserResponseDTO",
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
