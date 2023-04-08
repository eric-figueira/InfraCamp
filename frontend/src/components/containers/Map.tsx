import React, { useEffect, useState, useRef } from 'react';
import './Map.css'
import * as maptilersdk from '@maptiler/sdk';
import searchControl from './SearchControl';
import "@maptiler/sdk/dist/maptiler-sdk.css";

const Map: React.FC = () => {
    const [KEY] = useState('61IAJkR9OhCFaMNRNeOn');
    const map = useRef<maptilersdk.Map | undefined>();
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

        if (map.current) return;
        map.current = new maptilersdk.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`,
            terrainControl: false,
            scaleControl: true,
            navigationControl: true,
            center: [lng, lat],
            zoom: zoom,
        })

        map.current.setStyle(maptilersdk.MapStyle.STREETS);
        maptilersdk.config.primaryLanguage = maptilersdk.Language.PORTUGUESE;

        map.current.addControl(searchControl);
    });

    useEffect(() => {
        let button: HTMLButtonElement | null = document.getElementsByClassName('maplibregl-ctrl-geolocate').item(0) as HTMLButtonElement;
        if (button != null)
            button.click();
    })

    return (
        <div id="map"/>
    )
}

export default Map;