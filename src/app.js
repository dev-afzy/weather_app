const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geo = require('../utils/geo')
const forcast = require('../utils/forcast')
// const data = require('../public/js/app')
const app = express()
 
// app.use(express.static(pathd))
// app.use(express.static(path.join(__dirname, '../public')));

//define path foe express configuration
 const assetsPath = path.join(__dirname, '../public')
 const temp = path.join(__dirname,'../templates/views')
 const handle = path.join(__dirname,'../templates/partial')
 app.use(express.static(assetsPath))

 // setting envitonmrnt port

 const port = process.env.PORT || 5000

//setting handlebar engine and view engine
app.set('view engine', 'hbs')
app.set('views', temp)
hbs.registerPartials(handle)



//index
app.get('',(req,res)=>
    res.render('index',{
        name:'Weather'
        }))


//weather

app.get('/weather',(req,res)=>{
   const address = req.query.address
    if (!address){
        return res.send({
            address:req.query.address,
            error:'address not found'
        })


    }geo(address,(error,{ lat, long , location } = {})=>
    {
            if (error){
                return res.send({
                    error
                })
                
            }
            forcast(lat ,long ,(data,error)=>{
                if (error){
                    return res.send({
                        error:'oops someting went wrong'
                    })

                }else{
                   res.send({
                        location,
                        summery:data,
                        address:req.query.address
                    })
                }
            })
        }
    )
})  
// app.get('/weather',(req,res)=>
// {
//     if (!req.query.address){
//         return res.send({
//             erorr:'adrress not foud'
//         })
//     }
//     res.send({
//         summery : 'snowing',
//         location:'calicut',
//         address:req.query.address
//     })
// })

//about
app.get('/about',(req,res)=>
res.render('about',
{
    name:'About'
}))

//help
app.get('/help',(req,res)=>
res.render('help',
{
    name:'Help'
}))

//help related pages

app.get('/help/*',(req,res)=>
res.render('error',
{
    error:'searched article notfound'
}))

//404 page not found
app.get('*',(req,res)=>
{
    res.render('error',
    {
        name:404,
        error:'404 page not found'
    })
})


app.listen(port, ()=>
console.log("server llistening ti port "+port))