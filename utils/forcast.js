
const request =require('request')


const forecast = (lat,long,call)=>{


    const url ='https://api.darksky.net/forecast/b3fe4ee697198bbf55b9a81806abfa49/'+lat+','+long+'?units=si'
    // destructuring response chnged to {body} older one error,response
    request({url,json:true},(error,{ body }={})=>
    
    {
        if (error){
            call('oops some error',undefined)

        }else if(body.error){
            call('unable to find location',undefined)
        }

        else{
           call( 'weather summery :'+body.daily.data[0].summary+'temprature:'+body.currently.temperature+'c')
           //call('temprature:'+body.currently.temperature+'c')
        }
    })
}

module.exports=forecast
