import React, { useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import SearchBar from './SearchBar';

const Map: React.FC = () => {
    const [KEY] = useState('61IAJkR9OhCFaMNRNeOn');
    const [map, setMap] = useState<maptilersdk.Map>();
    const [lat, setLat] = useState<number>(-22.9064);
    const [lng, setLng] = useState<number>(-47.0616);
    const [zoom] = useState(10);

    useEffect(() => {
        // sets the current position of the user to the lat and lng states
        const getPosition = (position: GeolocationPosition) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        }
        navigator.geolocation.getCurrentPosition(getPosition);

        // creates a map in the div with id="map"
        setMap(new maptilersdk.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`,
            center: [lng, lat],
            zoom: zoom,
        }));

        // adds a navigation control so then the user can navigate through the map
        setMap(map?.addControl(new maptilersdk.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
        }), 'top-right'));

        setMap(map?.addControl(new maptilersdk.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true
        }), 'top-right'));

        try {
            // adds a pin showing your current location
            if (map != null && lat != null && lng != null)
                new maptilersdk.Marker({ color: "#21275F" }).setLngLat([lng, lat]).addTo(map);
        } catch (ex) { }

    }, [KEY, lng, lat, zoom, map]);

    const handleLoad = (_map: maptilersdk.Map | undefined) => {
        setMap(_map);
    }

    return (
        <div id="map">
            <SearchBar map={map} onLoad={handleLoad}/>
        </div>
    )
}

export default Map;