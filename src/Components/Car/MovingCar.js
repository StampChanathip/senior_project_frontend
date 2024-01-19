import { useEffect, useState } from "react";
import MovingMarker from "./MovingMarker";
import { Popup } from "react-leaflet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSliderValue } from "../../Redux/timeSliderSlice";

const MovingCar = ({ path, initialPoint }) => {
  const [currentTrack, setCurrentTrack] = useState(initialPoint);
  const { isPlay, sliderValue } = useSelector((state) => state.timeSlider);
  const dispatch = useDispatch();

  useEffect(() => {
    let cursor = sliderValue;
    if (isPlay) {
      const interval = setInterval(() => {
        if (cursor < path.length - 1) {
          cursor += 1;
          dispatch(setSliderValue(cursor));
          setCurrentTrack(path[cursor]);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlay, path]);

  return (
    <div>
      <MovingMarker
        data={currentTrack === undefined ? path[path.length - 1] : currentTrack}
      >
        <Popup minWidth={90}>
          <span>This is car</span>
        </Popup>
      </MovingMarker>
    </div>
  );
};
export default MovingCar;
