import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import nodeData from "../MockData/node.json";
import linkData from "../MockData/link.json";
import mockPath from "../MockData/mockPath.json";
import mockPath2 from "../MockData/path2.json";
import MovingMarker from "./MovingMarker";
import convertDataToPath from "../Utils/convertDataToPath";
import { useSelector } from "react-redux";

const MainMap = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  const { excelData } = useSelector((state) => state.excelData);

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconAnchor: [0, 0],
    iconSize: [10, 15],
    shadowSize: [0, 0],
  });

  const path = convertDataToPath(excelData);
  const path2 = convertDataToPath(mockPath2);

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
        <MovingMarker path={path} carId={1} status={"run"} />
        {/* <MovingMarker path={path2} carId={18} status={"run"} /> */}
        {/* <GeoJSON key={Math.random()} data={nodeData} /> */}
        <GeoJSON key={Math.random()} data={linkData} />
      </MapContainer>
    </div>
  );
};

export default MainMap;
