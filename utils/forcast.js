
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
           call( 'Weather summery :'+body.daily.data[0].summary+'Temprature:'+
                body.currently.temperature+'c'+'High temprature'+
                body.daily.data[0].temperatureHigh+'Low temprature'+
                body.daily.data[0].temperatureLow)
          //call('temprature:'+body.currently.temperature+'c'))
           //call('temprature:'+body.currently.temperature+'c')
        }
    })
}

module.exports=forecast
