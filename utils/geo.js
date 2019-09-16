const request =require('request')

const geocode =(address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWZ6eSIsImEiOiJjanpyODlmN3cxOHNlM2JwNHpld25xdjBsIn0.xCZbU_dJVnje2Cio-JMjIA'

    request ({url ,json : true},(error,{ body } ={})=>{
        if(error){
            callback("oops something went wrong",undefined)
        }else if (body.features.length === 0)
        {
            callback('unable to find location',undefined)
        }
        
        else{
            callback(undefined,{
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                location : body.features[0].place_name})
        
        }

    })
}

module.exports=geocode

