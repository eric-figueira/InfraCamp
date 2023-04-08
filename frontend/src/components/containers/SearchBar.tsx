import React, { useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
declare var maplibreglMaptilerGeocoder: any;
import "https://unpkg.com/@maptiler/geocoding-control@latest/maplibregl.umd.js";

class searchControl implements maptilersdk.IControl {
    private KEY: string = "61IAJkR9OhCFaMNRNeOn";
    private _map: maptilersdk.Map | undefined = new maptilersdk.Map({
        container: "map",
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${this.KEY}`,
        center: [-22.9064, -47.0616],
        zoom: 10
    })
    private _container: HTMLElement = document.createElement("div");

    onAdd(map: any) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl';
        const _input: HTMLElement = document.createElement('input');
        _input.setAttribute('placeholder', 'Digite o nome da rua onde se encontra o problema');
        this._container.appendChild(_input);

        const geocoder = new maplibreglMaptilerGeocoder.GeocodingControl({
            apiKey: this.KEY,
            class: 'geocoder',
            showResultsWhileTyping: true,
            maplibregl: maptilersdk
        });
        map.addControl(geocoder, 'top-left');

        let m = new maptilersdk.Marker();
        geocoder.on('select', function (item: { bbox: [number, number, number, number]; place_name: any; }) {
            if (m != undefined)
                m.remove();
            map.fitBounds(item.bbox);
            console.log(item.bbox);
            console.log(item.place_name)
            m = new maptilersdk.Marker({
                color: "#0f1234"
            }).setLngLat([(item.bbox[0] + item.bbox[2]) / 2, (item.bbox[1] + item.bbox[3]) / 2]);
            m.addTo(map);
        })
        return this._container;
    }
    onRemove() {
        if (this._container.parentNode != null)
            this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

interface SearchBarProps {
    map: maptilersdk.Map | undefined,
    onLoad: (_map: maptilersdk.Map | undefined) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const handleLoad = () => {
        const mapa = props.map?.addControl(new searchControl());
        props.onLoad(mapa);
    }

    return (
        <div onLoad={handleLoad}></div>
    )
}

export default SearchBar;