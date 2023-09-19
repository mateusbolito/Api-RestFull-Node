// config inicial 

const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app = express()



// forma de ler o JSON/Middlewares 

app.use(
    express.urlencoded({
        extended: true,
    }),
) 


app.use(express.json()) 


const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint 
app.get('/', (req, res) => {

    res.json({message: 'Funcionando '})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(
   `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rmarfmc.mongodb.net/`
).then(()=> {
    console.log('conectou ao banco')
    app.listen(5000)
}).catch((error)=> console.log(error))
app.listen(3000) 