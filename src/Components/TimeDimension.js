import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-timedimension";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCarData, setCarData } from "../Redux/carDataSlice";

import { useSelector } from "react-redux";
import { setLinkData, setPermaLinkData } from "../Redux/linkDataSlice";
import { findCarbyTime } from "../Utils/findCarObject";

export const timeDimension = new L.TimeDimension({
  period: "PT1H",
});

const TimeDimension = () => {
  const dispatch = useDispatch();
  const map = useMap();
  const { excelData } = useSelector((state) => state.excelData);
  const { allLinkData } = useSelector((state) => state.linkData);
 
  useEffect(() => {
    dispatch(resetCarData())
    map.timeDimension = timeDimension;

    const player = new L.TimeDimension.Player(
      {
        transitionTime: 3000,
        loop: true,
        startOver: true,
      },
      timeDimension
    );
    const timeDimensionControlOptions = {
      player: player,
      timeDimension: timeDimension,
      position: "bottomright",
      autoPlay: false,
      minSpeed: 1,
      speedStep: 1,
      maxSpeed: 2,
      timeSlider: false
    };
    const timeDimensionControl = new L.Control.TimeDimension(
      timeDimensionControlOptions
    );

    map.addControl(timeDimensionControl);

    timeDimension.setAvailableTimes(
      excelData.map((obj) => obj.properties.time)
    );

    let prevCar = {};
    timeDimension.on("timeload", (data) => {
      const currentTimeCar = findCarbyTime(excelData, data.time);
      const currentTimeLink = findCarbyTime(allLinkData, data.time);
      // currentTimeLink.forEach((link) => {
      //   dispatch(setPermaLinkData(link.coordinates));
      // });
      currentTimeCar.forEach((car) => {
        if (Object.keys(prevCar).length === 0) {
          prevCar[car.properties.carId] = car;
        }
        const prev = prevCar[car.properties.carId]
        dispatch(
          setCarData({
            carId: car.properties.carId,
            detail: car.properties,
            position: car.geometry.coordinates[0],
            link: car.geometry.coordinates,
          })
        );
        if(prev){
          dispatch(
            setLinkData({
              carId: car.properties.carId,
              link: [
                ...car.properties.passedLink,
                car.geometry.coordinates[0],
              ],
            })
          );
        } else {
          dispatch(
            setLinkData({
              carId: car.properties.carId,
              link: [
                car.geometry.coordinates[0],
              ],
            })
          );
        }
        prevCar[car.properties.carId] = car
      });
    });

    timeDimension.on("", () => {
      console.log('abort')
    })
  }, []);
};

export default TimeDimension;
