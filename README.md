This algorithm pretends to solve the efective route of public transport or privated routes.
===

**Installation**

```
npm install --save qruta-calcular
```

**Usage**

```
const calculate = require("qruta-calcular");
```

```
await calculate({rutas: arrayOfRoutes, config: configuration, origen: startLocation, destino: endLocation, area: area, qty: Quantity});
```

#rutas: 
array of all posible routes
**Example**:

```
[
    {
        "id":"routeId",
        "area":{
            "1":[[lat,lng]]
        },
        "distances":[
            0,
            23
        ],
        "path":[
            [lat,lng,stop]
        ],
        "name":"routeName",
        "company":"companyName",
        "details":"routeInfo",
        "osisp":true
    }
]
```
- **id**: Unique id of the route
- **area**: Object of polygons for the range of the route.
- **distances**: Array of distances of the path, example: [0, 25,75] starting allways with 0, 25 meters is the distance between the first location and the second location of the **path** plus the distance of the previous location (25 + 0 = 25), 50 meters is the distance between the second location and the tirth location of the **path** plus the distance of the previous location (50 + 25 = 75).
- **path**: array of array with [lat,lng,stop(optional)] of the route path.
- **osisp**: Only Stop In Some Places, boolean true | false, default false, if true it will use only locations with stop of the current path.
- **name**: Name of the route.
- **company**: Name of the company.
- **details**: Aditional info about the route.

#config
Object of configutation
**Example**:

```
{
  "avgError": 0.3,
  "proportion": 10,
  "walkingDistance": 200,
  "busSpeed": 45
}
```
- **avgError**: Average percentage of error.
- **proportion**: This makes more or less important the walking distance.
- **walkingDistance**: Distance to walk between 2 routes.
- **busSpeed**: Average bus speed, this will help to get the average time.

#origen
The origin location in [lat,lng]
#destino
The destiny location in [lat,lng]
#area
Number of the area to search
#qty
Number of maximun responses

#response:

```
{
  success: true,
  codeError: 6,
  options: [
    {
      score: 9246.730232291655,
      routes: [
        {
          routeDistanceValue: 5256.725527524995,
          routeDistanceText: '5.3km',
          score: 9246.730232291655,
          route: {
            id: 'zITV42L9DX',
            name: 'C17',
            details: '4125 Centro - Santuario - Prado',
            company: 'Embusa',
            polyline: 'kk{aAnopg'
          },
          startPoint: [
            10.95878,
            -74.80072000000001
          ],
          endPoint: [
            10.990733,
            -74.789108
          ]
        }
      ],
      startWalk: 356.92917133053277,
      startWalkDistance: '356.9m',
      endWalk: 42.07129914613317,
      endWalkDistances: '42.1m',
      routeDistance: '5.3km',
      time: '13min'
    }
  ],
  start: [
    10.958107851215566,
    -74.7975266641815
  ],
  end: [
    10.990360000000067,
    -74.78916999999996
  ]
}
```

**codeError**:

- 6: No near routes to the pickup area
- 7: No near routes to the dropoff area
- 8: No routes found