import React, { useEffect, useState, useRef } from 'react';
import './Map.css'
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapController } from '@maptiler/geocoding-control/types';
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from 'maplibre-gl';
import * as maplibre from "maplibre-gl/dist/maplibre-gl";
import { GeocodingControl } from '@maptiler/geocoding-control/react';
import { Feature } from '@maptiler/geocoding-control/types';
import Filter from '../../components/Filter/Filter';
import { useGet } from '../../hooks/useGet';
import Denuncia from '../../types/Denuncia';
import Complaint from '../../components/Complaint/Complaint';

interface MapProps {
    hasSearchBar?: boolean;
    hasFilter?: boolean;
    hasCard?: boolean;
}

type Filtro = 'status' | 'tipo' | 'data';

const compareDates = (date1: string, date2: string): boolean => {
    // 2023-04-27t00:00:00
    if (Number(date1.substring(5, 7)) - Number(date2.substring(5, 7)) === 0 && Number(date1.substring(0, 4)) - Number(date2.substring(0, 4)) === 0)
        return true;
    return false;
}

const Map: React.FC<MapProps> = (props) => {
    const { data: denuncias } = useGet<Denuncia[]>('http://localhost:5164/api/denuncias');

    const map = useRef<maplibre.Map | undefined>();
    const [mapController, setMapController] = useState<MapController>();

    useEffect(() => {
        const coords: maptilersdk.LngLatLike = [-22.9064, -47.0616]

        //seta a latitude e longitude da localização do usuário para o state
        const getPosition = (position: GeolocationPosition) => {
            coords[0] = position.coords.latitude;
            coords[1] = position.coords.longitude;
        }
        navigator.geolocation.getCurrentPosition(getPosition);

        if (map.current) return;
        map.current = new maplibre.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=61IAJkR9OhCFaMNRNeOn`,
            center: coords,
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
    }, []);



    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        denuncias?.map(denuncia => {
            // if (compareDates(new Date() + "", denuncia.dataDenuncia + "")) {
                var marker = new maplibregl.Marker({ color: "#2523ad" })
                    .setLngLat([denuncia.longitude, denuncia.latitude]);
                
                if (map.current !== undefined)
                    marker.addTo(map.current);
            //}
        })
    })

    useEffect(() => {
        let button: HTMLButtonElement | null = document.getElementsByClassName('maplibregl-ctrl-geolocate').item(0) as HTMLButtonElement;
        if (button != null)
            button.click();
    })

    // function filtrarDenuncias(type: Filtro, index: number) {
    //     switch (type) {
    //         case 'status':
    //             // eslint-disable-next-line array-callback-return
    //             denuncias?.filter(denuncia => {
    //                 if (denuncia.idStatus === index + 1) {
    //                     var el = document.createElement('div');
    //                     el.className = 'marker';
    //                     el.addEventListener('click', function () { });
    //                     var marker = new maplibregl.Marker(el)
    //                         .setLngLat([denuncia.longitude, denuncia.latitude]);

    //                     if (map.current !== undefined)
    //                         marker.addTo(map.current);
    //                 }
    //             })
    //             break;
    //         case 'tipo':
    //             // eslint-disable-next-line array-callback-return
    //             denuncias?.filter(denuncia => {
    //                 if (denuncia.idTipo === index + 1) {
    //                     var marker = new maplibregl.Marker({ color: "#2523ad" })
    //                         .setLngLat([denuncia.longitude, denuncia.latitude]);

    //                     if (map.current !== undefined)
    //                         marker.addTo(map.current);
    //                 }
    //             })
    //             break;
    //         case 'data':
    //             // eslint-disable-next-line array-callback-return
    //             denuncias?.filter(denuncia => {
    //                 switch (index) {
    //                     case 0:
    //                         if (new Date().getDay() - denuncia.dataDenuncia.getDay() <= 1) {
    //                             var marker = new maplibregl.Marker({ color: "#2523ad" })
    //                                 .setLngLat([denuncia.longitude, denuncia.latitude]);

    //                             if (map.current !== undefined)
    //                                 marker.addTo(map.current);
    //                         }
    //                         break;
    //                     case 1:
    //                         var dif = new Date().getDay() - denuncia.dataDenuncia.getDay()
    //                         if (1 < dif && dif <= 7) {
    //                             // eslint-disable-next-line @typescript-eslint/no-redeclare
    //                             var marker = new maplibregl.Marker({ color: "#2523ad" })
    //                                 .setLngLat([denuncia.longitude, denuncia.latitude]);

    //                             if (map.current !== undefined)
    //                                 marker.addTo(map.current);
    //                         };
    //                         break;
    //                     case 2:
    //                         // eslint-disable-next-line @typescript-eslint/no-redeclare
    //                         var dif = new Date().getDay() - denuncia.dataDenuncia.getDay()
    //                         if (7 < dif && dif <= 30) {
    //                             // eslint-disable-next-line @typescript-eslint/no-redeclare
    //                             var marker = new maplibregl.Marker({ color: "#2523ad" })
    //                                 .setLngLat([denuncia.longitude, denuncia.latitude]);

    //                             if (map.current !== undefined)
    //                                 marker.addTo(map.current);
    //                         };
    //                         break;
    //                 }
    //             })
    //             break;
    //     }
    // }

    return (
        <div id="map">
            {props.hasSearchBar &&
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
                        enableReverse={true} />
                </div>
            }
            {/* {props.hasFilter && <Filter filterMap={filtrarDenuncias} />} */}
            {/* {props.hasCard && <Complaint cpf={denuncia.idUsuario} idDenunia={denuncia.idDenuncia} userName={denuncia.nome} date={denuncia.dataDenuncia} type={denuncia.tipo} address={denuncia.endereco} description={denuncia.descricao} status={denuncia.status} imgUrl={denuncia.urlImagem}/>} */}
        </div>
    )
}

export default Map;
