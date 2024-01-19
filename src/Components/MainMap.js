import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import MovingCar from "./Car/MovingCar";

import nodeData from "../MockData/node.json";
import linkData from "../MockData/link.json";
import path1 from "../MockData/path1.json";

const MainMap = () => {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconAnchor: [0, 0],
    iconSize: [10, 15],
    shadowSize: [0, 0],
  });

  return (
    <div className="leaflet-container">
      <MapContainer
        center={{ lat: 13.73539348650398, lng: 100.52880549483235 }}
        zoom={16}
        minZoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MovingCar path={path1} initialPoint={path1[0]} />
        <GeoJSON key={Math.random()} data={linkData} />
      </MapContainer>
    </div>
  );
};

export default MainMap;
