import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";

import chargeStation from "../MockData/chargingStation.json";

import MovingMarker from "./MovingMarker";
import PassengerDetails from "./PassengerDetails";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TimeDimension from "./TimeDimension";
import ChargeStationMarker from "./ChargeStationMarker";
import mockLine from "../MockData/mockLine.json";
import { linkColor } from "../Utils/colorConfig";
import ChargingStationDetail from "./ChargingStationDetail";

const MainMap = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  const { excelData } = useSelector((state) => state.excelData);
  const [carsData, setCarsData] = useState([]);
  const { linkData, permaLinkData } = useSelector((state) => state.linkData);

  useEffect(() => {
    const cars = Array.from(Array(20).keys()).map((i) => {
      return {
        carId: i + 1,
        data: [...excelData.filter((j) => Number(j.properties.carId) === i + 1)],
      };
    }).filter((i) => i.data.length !== 0);
    setCarsData(cars);
  }, [excelData]);

  useEffect(() => {
    // console.log(carsData);
  }, [carsData])

  const permaLinkOptions = {
    color: "#99ffd6",
    weight: "4"
  };



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
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <TimeDimension />
        <Polyline
          positions={permaLinkData}
          pathOptions={permaLinkOptions}
        />
        {carsData.length !== 0 &&
          carsData
            .map((car, idx) => {
              return (
                <>
                  <MovingMarker
                    key={idx}
                    currentCarData={car}
                    carId={car.carId}
                  />
                  <Polyline
                    key={`line ${idx}`}
                    pathOptions={linkColor[car.carId]}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.openPopup()
                    },
                    mouseout: (e) => {
                      e.target.closePopup()
                    }}}
                    positions={
                      linkData[car.carId] ? linkData[car.carId].link : []
                    }
                    zIndex={1}
                  ><Popup className="link-popup">Car {car.carId}</Popup></Polyline>
                </>
              );
            })}
        
        {chargeStation.map((station, idx) => {
          return <ChargeStationMarker station={station} stationId={idx+1} key={idx} />;
        })}
        <ChargingStationDetail/>
        <PassengerDetails />
      </MapContainer>
    </div>
  );
};

export default MainMap;
