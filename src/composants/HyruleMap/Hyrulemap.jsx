import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "pannellum/build/pannellum.js";
import "pannellum/build/pannellum.css";
import "./hyrulemap.css";
import hyruleMap from "../../assets/images/hyruleMap.jpeg";
import spotsData from "./spotsData.json";
import Regions from "./Regions";

// Le chemin des icônes par défaut de Leaflet est perdu une fois bundlé par Vite
const markerIconOptions = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// Les coordonnées des spots sont calées sur l'image (2984 x 2496) ramenée à 1000 de haut
const MAP_HEIGHT = 1000;
const MAP_WIDTH = Math.round((MAP_HEIGHT * 2984) / 2496);
const bounds = [
  [0, 0],
  [MAP_HEIGHT, MAP_WIDTH],
];

const HyruleMap = () => {
  const mapRef = useRef(null);
  const panoramaRef = useRef(null);
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      crs: L.CRS.Simple,
      minZoom: -3,
      maxZoom: 2,
      zoomSnap: 0.25,
      maxBounds: L.latLngBounds(bounds).pad(0.2),
      attributionControl: false,
    });
    L.imageOverlay(hyruleMap, bounds).addTo(map);
    map.fitBounds(bounds, { padding: [20, 20] });

    for (const item of spotsData) {
      L.marker([item.y, item.x], { icon: markerIconOptions, title: item.locationName })
        .addTo(map)
        .bindTooltip(item.locationName)
        .on("click", () => setSpot(item));
    }

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!spot) return;
    const viewer = window.pannellum.viewer(panoramaRef.current, spot.panoramaData);
    return () => viewer.destroy();
  }, [spot]);

  return (
    <div className="gros-container hyrule-map">
      <div className="page-header">
        <h1 className="page-title hylia-font text-gold">Hyrule Map</h1>
        <span className="color-stats">
          {spot ? spot.locationName : `${spotsData.length} panoramic views — click a marker to explore`}
        </span>
      </div>

      <div className="map-frame">
        <div id="map" ref={mapRef}></div>
        {spot && (
          <div className="panorama-layer">
            <div id="panorama" ref={panoramaRef}></div>
            <button id="goBack" type="button" className="btn-gold" onClick={() => setSpot(null)}>
              Map
            </button>
          </div>
        )}
      </div>

      <Regions />
    </div>
  );
};

export default HyruleMap;
