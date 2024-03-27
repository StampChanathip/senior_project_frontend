import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";

import nodeData from "../MockData/node.json";
import linkData from "../MockData/link.json";
import timeMock from "../MockData/timeMock.json"

import MovingMarker from "./MovingMarker";
import PassengerDetails from "./PassengerDetails";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TimeDimension from "./TimeDimension";

const MainMap = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  const { excelData } = useSelector((state) => state.excelData);
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    const cars = Array.from(Array(20).keys()).map((i) => {
      return {
        carId: i,
        data: [...excelData.filter((j) => Number(j.carId) === i)],
      };
    });
    setCarsData(cars);
  }, []);

  useEffect(() => {
    // console.log(carsData);
  }, []);

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconAnchor: [0, 0],
    iconSize: [10, 15],
    shadowSize: [0, 0],
  });
// [39.151222675648221, 34.199670805202523]
  return (
    <div className="leaflet-container">
      <MapContainer
        center={{ lat: 13.73539348650398, lng: 100.52880549483235 }}
        // center={{ lat: 34.199670805202523, lng: 39.151222675648221 }}
        zoom={16}
        minZoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {/* <TimeDimension geoJson={timeMock}/> */}
        {carsData.filter((i) => i.data.length !== 0).length !== 0 &&
          carsData
            .filter((i) => i.data.length !== 0)
            .map((car, idx) => {
              return (
                <MovingMarker key={idx} carData={car.data} carId={car.carId} />
              );
            })}

        {/* <GeoJSON key={Math.random()} data={nodeData} /> */}
        {/* <Marker position={{ lat: 13.735033, lng: 100.528689 }}></Marker> */}
        {/* <GeoJSON
          key={Math.random()}
          data={linkData}
          style={{ color: "#b3d9ff" }}
        /> */}

        <PassengerDetails />
      </MapContainer>
    </div>
  );
};

export default MainMap;
