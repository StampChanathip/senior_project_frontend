import "./App.css";

import TimeSlider from "./Components/TimeSlider";
import MainMap from "./Components/MainMap";

function App() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <TimeSlider />
      <MainMap />
    </div>
  );
}

export default App;
