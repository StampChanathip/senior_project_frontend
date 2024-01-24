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

      <form method="post" enctype="multipart/form-data">
        <input type="file" name="excel_file" />
        <button type="submit">Import</button>
      </form>
      <MainMap />
    </div>
  );
}

export default App;
