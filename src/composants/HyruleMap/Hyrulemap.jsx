import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './hyrulemap.css';

const HyruleMap = ({ loadingImagePath }) => {
  useEffect(() => {
    let map;
    let panoramaViewer;

    const initStreetViewer = (panoramaData) => {
      const panorama = document.getElementById('panorama');
      panorama.classList.remove('hide');

      panoramaViewer = pannellum.viewer('panorama', {
        ...panoramaData,
        loadingConfig: {
          image: loadingImagePath,
          loaderIcon: true,
        },
      });

      const mapElement = document.getElementById('map');
      mapElement.classList.add('hide');

      const btn = document.getElementById('goBack');
      btn.classList.remove('hide');
      btn.addEventListener('click', () => {
        panoramaViewer.destroy();
        panorama.classList.add('hide');
        mapElement.classList.remove('hide');
        btn.classList.add('hide');
      });
    };

    const mapSpotsToMap = async () => {
      const spotsData = await (await fetch('./spotsData.json')).json();
      map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -0.5,
      });

      const bounds = [[0, 0], [1000, 2000]];
      const image = L.imageOverlay('src/assets/images/hyruleMap.jpeg', bounds).addTo(map);
      map.fitBounds(bounds);

      for (const spot of spotsData) {
        const position = L.latLng([spot.y, spot.x]);
        L.marker(position)
          .addTo(map)
          .bindPopup(spot.locationName)
          .on('click', () => {
            initStreetViewer(spot.panoramaData);
          });
      }
    };

    mapSpotsToMap();

    // Cleanup function
    return () => {
      if (panoramaViewer) {
        panoramaViewer.destroy();
      }
      if (map) {
        map.remove();
      }
    };
  }, []); 

  return (
    <>
      <div id="map"></div>
      <div id="panorama" className="hide"></div>
      <button id="goBack" className="hide">Map</button>
    </>
  );
};

export default HyruleMap;