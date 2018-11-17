// Tomasok,
// Return distance between 2 pairs of latitude,longitude coordinates in kilometers

export default function haverDistance(lat1,lat2,lon1,lon2)
{

    let R = 6371; // km radius of planet earth
    let dLat = toRad((lat2-lat1));
    let dLon = toRad((lon2-lon1));
    let lat1r = toRad(lat1);
    let lat2r = toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1r) * Math.cos(lat2r);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;

    return d; // in kilometers
}

function toRad(Value)
{
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}


