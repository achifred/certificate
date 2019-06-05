import express from 'express'
import bodyParser from 'body-parser'
import checkRoutes from './api/routes/searchcert'

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, PATCH');
        return res.status(200).json({});

    }
    next();
})


app.use('/', checkRoutes) 

app.use((req,res,next)=>{
    const error = new Error('NOT FOUND');
    error.status=404;
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status||500)
    res.json({
        error:{
            message: error.message
        }
    })
})
    
export{app}
export default app