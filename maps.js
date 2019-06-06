function getDirectionDuration(src, dest, stops = []) {

    var waypts = [];
    for (var i = 0; i < stops.length; i++) {
        waypts.push({
            location: stops[i],
            stopover: true
        });
    }

    var totalDur = 0;
    getRouteData(src, dest, waypts).then(response => {
        for (var i = 0; i < response.routes[0].legs.length; i++) {
            totalDur += response.routes[0].legs[i].duration.value;
        }
        totalDur /= 60;
        console.log(totalDur);

        return Math.round(totalDur);
    });
}

function getDirectionDistance(src, dest, stops = []) {

    var waypts = [];
    for (var i = 0; i < stops.length; i++) {
        waypts.push({
            location: stops[i],
            stopover: true
        });
    }

    getRouteData(src, dest, waypts).then(response => {
        var totalDis = 0;
        for (var i = 0; i < response.routes[0].legs.length; i++) {
            totalDis += response.routes[0].legs[i].distance.value;
        }
        totalDis /= 1609.34;
        console.log(totalDis);
        return Math.round(totalDis);
    });
}

function getRouteData(src, dest, waypts) {
    var directionsService = new google.maps.DirectionsService;

    return new Promise(function (resolve) {
        directionsService.route({
            origin: src,
            destination: dest,
            waypoints: waypts,
            travelMode: 'DRIVING',
            optimizeWaypoints: false,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'pessimistic'
            }
        }, function (response, status) {
            if (status === 'OK') {
                resolve(response);
            }
            else {
                resolve('ERROR: ' + status);
            }
        });
    })
}

function test_route() {

    var dur = getDirectionDuration('2108 Beaver Creek Lane, Southlake, TX, 76092', '2000 W Southlake Blvd, Southlake, TX, 76092', ['1305 Plantation Drive, Southlake, TX, 76092']);
    var dis = getDirectionDistance('2108 Beaver Creek Lane, Southlake, TX, 76092', '2000 W Southlake Blvd, Southlake, TX, 76092', ['1305 Plantation Drive, Southlake, TX, 76092']);

    console.log("Duration: " + dur + " ; Distance: " + dis);
}