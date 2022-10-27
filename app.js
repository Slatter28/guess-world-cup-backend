const express = require('express');
const app = express();
const db = require('./database/db');
const initModels = require('./models/initModels')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
app.use(express.json());

db.sync()
    .then(() => {
        console.log('Database Synced')
    })
    .catch(err => {
        console.log(err)
    })



initModels()

app.get('/',(req, res) => {
    res.status(200).json({
        message: 'OK!'
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)


app.listen(8080,()=>{
    console.log('Server ready in port 8080');
})