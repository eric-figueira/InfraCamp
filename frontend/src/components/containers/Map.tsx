import React, { useEffect, useState, useRef } from 'react';
import maplibregl from 'maplibre-gl'

const Map = () => {
    const [ KEY ] = useState('H86RlEPvuAYsY170ofCr');
    const [ map, setMap ] = useState<maplibregl.Map>();
    const [ lat, setLat ] = useState<number>(-22.9064);
    const [ lng, setLng ] = useState<number>( -47.0616);
    const [ zoom, setZoom ] = useState(10);

    useEffect(() => {
        // sets the current position of the user to the lat and lng states
        const getPosition = (position : GeolocationPosition) => { 
            setLat(position.coords.latitude); 
            setLng(position.coords.longitude);
        }
        navigator.geolocation.getCurrentPosition(getPosition);

        // creates a map in the div "map"
        setMap(new maplibregl.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`,
            center: [lng,lat],
            zoom: zoom
        }));

        setMap(map?.addControl(new maplibregl.NavigationControl({}), 'top-right'))
    }, []);

    return (
        // ref={mapContainer} makes the map's HTML element to be indicated
        <div id="map"></div>
    )
}

export default Map;