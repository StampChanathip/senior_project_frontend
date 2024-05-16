import { useEffect, useState } from "react";
import L from "leaflet";
// import "./Legend.css";
import { useMap } from "react-leaflet";
import { player, timeDimension } from "./TimeDimension";
import moment from "moment";

const TimePlayer = () => {
  const map = useMap();
  const [isPlay, setIsPlay] = useState(false)
  useEffect(() => {
    const timeControl = L.control({ position: "bottomright" });
    timeControl.onAdd = () => {
        timeControl._div = L.DomUtil.create("button", "info timeControl");
        timeControl.update()

        timeControl._div.addEventListener("click", () => {
          player.isPlaying() ? player.stop() : player.start()
        });
        return timeControl._div;
      };
      timeControl.update = (props) => {
        timeControl._div.innerHTML =
        `<h2> ${props ?? "Play"}</h2>`
      }

      player.on("play", () => {
        setIsPlay(true)
        timeControl.update('Pause')
      })

      player.on("stop", () => {
        setIsPlay(false)
        timeControl.update('Play')
      })
    
      timeControl.addTo(map)
  }, [map]);
  return null;
};

export default TimePlayer;
