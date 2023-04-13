 import React, { useEffect, useState, useRef } from 'react';
 import './Map.css'
 import * as maptilersdk from '@maptiler/sdk';
 import { GeocodingControl } from '@maptiler/geocoding-control/react';
 import "@maptiler/sdk/dist/maptiler-sdk.css";
 import { MapController } from '@maptiler/geocoding-control/types';
 import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
 import maplibregl from 'maplibre-gl';
 import * as maplibre from "maplibre-gl/dist/maplibre-gl";
 import { Feature } from '@maptiler/geocoding-control/types';

const Map: React.FC = () => {
    const map = useRef<maplibre.Map | undefined>();
    const [lat, setLat] = useState<number>(-22.9064);
    const [lng, setLng] = useState<number>(-47.0616);
    const [mapController, setMapController] = useState<MapController>();

     useEffect(() => {
          //sets the current position of the user to the lat and lng states
         const getPosition = (position: GeolocationPosition) => {
             setLat(position.coords.latitude);
             setLng(position.coords.longitude);
         }
         navigator.geolocation.getCurrentPosition(getPosition);

        if (map.current) return;
        map.current = new maplibre.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=61IAJkR9OhCFaMNRNeOn`,
            center: [lng, lat],
            zoom: 10,
        })

         map.current.addControl(new maplibre.NavigationControl({
             showZoom: true,
             showCompass: true,
             visualizePitch: true
         }));
         map.current.addControl(new maplibregl.ScaleControl({}), 'bottom-left');
         map.current.addControl(new maplibre.GeolocateControl({}));
         maptilersdk.config.primaryLanguage = maptilersdk.Language.PORTUGUESE;

         setMapController(createMapLibreGlMapController(map.current, maplibregl));
     });

     useEffect(() => {
         let button: HTMLButtonElement | null = document.getElementsByClassName('maplibregl-ctrl-geolocate').item(0) as HTMLButtonElement;
         if (button != null)
             button.click();
     })

    return (
        <div id="map">
            <div className="searchBar">
                <GeocodingControl 
                language='pt' 
                country='br' 
                showResultsWhileTyping={true} 
                placeholder='Digite o nome da rua onde se encontra o problema' apiKey={'61IAJkR9OhCFaMNRNeOn'} 
                mapController={mapController} 
                onResponse={(e => {
                    let arrayFeatures = e.featureCollection.features.filter((item: Feature) => item.place_name.includes("Campinas, São Paulo"))
                    e.featureCollection.features = arrayFeatures;
                })} 
                errorMessage={"Falha ao buscar dados"}
                noResultsMessage="Sem resultados para a busca"
                clearButtonTitle="Limpar"
                enableReverse={true}/>
            </div>
        </div>
    )
}

 export default Map;

//  import React, { useEffect, useState, useRef } from 'react';

//  const Map: React.FC = () => {
//      return (
//          <div>
//              Hello world!
//          </div>
//      )
//  }

//  export default Map;
