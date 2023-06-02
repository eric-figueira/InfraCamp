import React, { useEffect, useState, useRef } from 'react';
import './Map.css'
import "@maptiler/sdk/dist/maptiler-sdk.css";

import * as maptilersdk from '@maptiler/sdk';

import { MapController } from '@maptiler/geocoding-control/types';
import { Feature } from '@maptiler/geocoding-control/types';
import Denuncia from '../../types/Denuncia';

import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from 'maplibre-gl';
import * as maplibre from "maplibre-gl/dist/maplibre-gl";
import { renderToStaticMarkup } from "react-dom/server"

import { useGet } from '../../hooks/useGet';

import { GeocodingControl } from '@maptiler/geocoding-control/react';
import Complaint from '../../components/Complaint/Complaint';

interface MapProps {
    hasSearchBar?: boolean;
    hasCard?: boolean;
    idDiv: string;
    denuncia?: Denuncia;
    setDenuncia?: React.Dispatch<React.SetStateAction<Denuncia>>;
}

const Map: React.FC<MapProps> = (props) => {
    const [showComplaint, setShowComplaint] = useState<boolean>(false);
    const [denuncia, setDenuncia] = useState<Denuncia>(props.denuncia != null ? props.denuncia : {} as Denuncia);

    const { data: denuncias } = useGet<Denuncia[]>('api/denuncias');

    const map = useRef<maplibre.Map | undefined>();
    const [mapController, setMapController] = useState<MapController>();

    useEffect(() => {
        const coords: maptilersdk.LngLatLike = props.denuncia == null || props.denuncia.latitude === 0 ? [-47.0616, -22.9064] : [denuncia.latitude as number, denuncia.longitude as number];

        //seta a latitude e longitude da localização do usuário para o state
        const getPosition = (position: GeolocationPosition) => {
            coords[0] = position.coords.latitude;
            coords[1] = position.coords.longitude;
        }
        navigator.geolocation.getCurrentPosition(getPosition);

        if (map.current) return;
        map.current = new maplibre.Map({
            container: props.idDiv,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=61IAJkR9OhCFaMNRNeOn`,
            center: coords,
            zoom: 11,
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
    }, []);


    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        denuncias?.map(denuncia => {
            // create a DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            var a = <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="#4758d7" viewBox="0 0 256 256"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path></svg>
            var b = renderToStaticMarkup(a);
            el.innerHTML = b;
            el.addEventListener('click', function () {
                setDenuncia(denuncia);
                setShowComplaint(true);
            });

            // add marker to map
            var marker = new maplibregl.Marker(el)
                .setLngLat([denuncia.longitude, denuncia.latitude]);

            if (map.current !== undefined)
                marker.addTo(map.current);
        })
    })

    useEffect(() => {
        if (props.denuncia == null) {
            let button: HTMLButtonElement | null = document.getElementsByClassName('maplibregl-ctrl-geolocate').item(0) as HTMLButtonElement;
            if (button != null)
                button.click();
        }
    }, [mapController, props.denuncia]);

    useEffect(() => {
        let input = document.getElementsByClassName("svelte-p509gh").item(3) as HTMLInputElement
        if (input != null) {
            input.value = props.denuncia == null ? "" : props.denuncia?.endereco + "";
        }
    }, [props.denuncia])

    return (
        <div id={props.idDiv}>
            {props.hasSearchBar &&
                <div className="searchBar">
                    <GeocodingControl
                        onPick={({ bbox, place_name }) => {
                            props.setDenuncia !== undefined ? props.setDenuncia({ ...props.denuncia, longitude: ((bbox[0] + bbox[2]) / 2), latitude: ((bbox[1] + bbox[3]) / 2) } as Denuncia) : console.log("");

                            props.setDenuncia !== undefined ? props.setDenuncia({ ...props.denuncia, endereco: place_name } as Denuncia) : console.log("")
                        }}

                        onResponse={(e => {
                            let arrayFeatures = e.featureCollection.features.filter((item: Feature) => item.place_name.includes("Campinas, São Paulo"))
                            e.featureCollection.features = arrayFeatures;
                        })}

                        showFullGeometry={true}
                        trackProximity={true}

                        language='pt'
                        country='br'
                        showResultsWhileTyping={true}
                        placeholder='Digite o nome da rua onde se encontra o problema'
                        apiKey={'61IAJkR9OhCFaMNRNeOn'}
                        mapController={mapController}

                        errorMessage={"Falha ao buscar dados"}
                        noResultsMessage="Sem resultados para a busca"
                        clearButtonTitle="Limpar" />
                </div>
            }

            {props.hasCard && <Complaint isVisible={showComplaint} setVisible={setShowComplaint} cpf={denuncia?.cpf} idDenunia={denuncia?.idDenuncia} date={denuncia?.dataDenuncia} idTipo={denuncia?.idTipo} address={denuncia?.endereco} description={denuncia?.descricao} idStatus={denuncia?.idStatus} imgUrl={denuncia?.urlImagem} />}
        </div>
    )
}

export default Map;
