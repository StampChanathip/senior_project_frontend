import { useEffect } from "react";
import L from "leaflet";
// import "./Legend.css";
import { useMap } from "react-leaflet";
import { timeDimension } from "./TimeDimension";
import moment from "moment";

const TimeDisplay = () => {
  const map = useMap();

  useEffect(() => {
    const info = L.control({ position: "topleft" });

    info.onAdd = () => {
      info._div = L.DomUtil.create("div", "info legend");
      info.update();
      return info._div;
    };

    info.update = (props) => {
      info._div.innerHTML =
        `<h2> ${props ? moment(props).utc().format("hh:mm:ss a") : "00:00"}</h2>`
    };

    timeDimension.on("timeload", (data) => {
        info.update(data.time)
    });

    info.addTo(map);
  }, [map]);
  return null;
};

export default TimeDisplay;
