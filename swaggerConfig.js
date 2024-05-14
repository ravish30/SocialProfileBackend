const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Profile Assignment',
      version: '1.0.0',
      description: 'Social Profile API covered Create, Read, Update, and Delete operations using a Node.js API',
    },
    servers:[
      {url:'http://localhost:5000/api', description: 'local server'},
      {url:'https://social-profile-backend-git-master-goyal200130s-projects.vercel.app/api', description: 'production server'},
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: ['./routes/*.js'], //you can change you swagger path
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
