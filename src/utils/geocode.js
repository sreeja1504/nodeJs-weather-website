const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3JlZWphLW1hZGlyZSIsImEiOiJja2w2dzdrMHkwYXV0MnhyMmkxbW52ajR5In0.5aJ3vbnOGPDq8yNHsVQi8A&limit=1';
    // request({url:url ,json:true},(error,response)=>{
    //    if(error){
    //        callback('Unable to connect to location services',undefined);
    //    }else if(response.body.features.lenght==0){
    //        callback('Unable to find location .Try another search',undefined);
    //    }
    //    else{
    //        callback(undefined,{
    //            latitude : response.body.features[0].center[0],
    //            longitude :response.body.features[0].center[1],
    //            location : response.body.features[0].place_name
    //        })
    //    }
    // })

    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined);
        }else if(body.features.length==0){
            callback('Unable to find location .Try another search',undefined);
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude :body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
     })
 
}
module.exports = geocode
// module.exports ={
//     geocode : geocode
// } 