const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, './')));


const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')

dotenv.config();


const PORT = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`This is Backend Service. Visit http://localhost:${PORT}/api-docs for APIS`)
})

app.use('/api', authRoutes)
app.use('/api', userRoutes)


app.listen(PORT, () => {
    console.log('Server Started at PORT', PORT);
})