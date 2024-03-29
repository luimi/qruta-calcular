const fs = require('fs')
const calculate = require('./index');
const data = fs.existsSync('./data.json') ? require('./data.json'):undefined
const locations = fs.existsSync('./locations.json') ? require('./locations.json'):undefined
const config = {
    walkInterval: 500,
    maxMetersBTWpoints: 100,
    avgError: 0.3,
    proportion: 10,
    walkingDistance: 200
};
if(!data){
    console.log("No data loaded");
    return;
}
if(!locations){
    console.log("No locations loaded");
    return;
}

const calculateSingle = async (locations) => {
    const response = await calculate({rutas:data.result["OWcpsp0ID3"]["massive"],config:config,origen:locations.start,destino:locations.end,area:1,qty:5});
    let responseStr = JSON.stringify(response);
    fs.writeFileSync('result.js', "var resultado = "+responseStr);
}
const calculateLocations = async () => {
    for(let [index,calculo] of locations.entries()){
        const start = new Date();
        const response = await calculate({rutas:data.result[calculo.city][calculo.type],config:config,origen:calculo.start,destino:calculo.end,area:1,qty:5});
        const time = new Date() - start;
        if(response.success){
            console.log('p:',index+1,'tiempo',time+'ms','respuestas',response.options.length,'buses',response.options[0].routes.length,calculo.type);
        }
        
    };
}
calculateSingle({start:[11.001883480016401,-74.83366584904495],end:[10.953598684997559,-74.80336258372827]});
//calculateLocations();