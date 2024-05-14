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
      {url:'http://localhost:5000/api'}, //you can change you server url
    ],
  },

  apis: ['./routes/*.js'], //you can change you swagger path
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
