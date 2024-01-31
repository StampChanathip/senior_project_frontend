import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import nodeData from "../MockData/node.json";
import linkData from "../MockData/link.json";

import MovingMarker from "./MovingMarker";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MainMap = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  const { excelData } = useSelector((state) => state.excelData);
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    // seperate each car into array of objects like mockData

    const cars = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map((i) => {
      return { carId: i, data: [...excelData.filter((j) => j.carId == i)] };
    });
    setCarsData(cars);
  }, []);

  useEffect(() => {
    console.log(carsData);
  }, [carsData]);

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
        {carsData.filter((i) => i.data.length !== 0).length !== 0 &&
          carsData
            .filter((i) => i.data.length !== 0)
            .map((car, idx) => {
              return (
                <MovingMarker key={idx} carData={car.data} carId={car.carId} />
              );
            })}

        {/* <GeoJSON key={Math.random()} data={nodeData} /> */}
        <GeoJSON key={Math.random()} data={linkData} />
      </MapContainer>
    </div>
  );
};

export default MainMap;
