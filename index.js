require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

app.use(cors());
app.use(express.json())
app.use('/api', router)

// the last
app.use(errorHandler)



const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Server start on ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start();



