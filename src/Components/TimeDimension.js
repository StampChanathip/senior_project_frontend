import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-timedimension";
import { useEffect } from "react";

const TimeDimension = ({ geoJson }) => {
  const map = useMap();
  const icon = (url) =>
    L.icon({
      iconSize: [24, 24],
      popupAnchor: [2, -20],
      iconUrl: url,
    });

  useEffect(() => {
    const timeSeriesGeoJSON = {
      features: [
        {
          type: "Feature",
          id: -1549271008,
          properties: {
            id: 827793,
            time: "2006-03-11T08:00:00",
            insol: 61.73542,
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [39.151222675648221, 34.199670805202523],
                [39.151222675712766, 34.199675276071595],
                [39.151228272367668, 34.199675276015682],
                [39.151228272302838, 34.199670805146624],
                [39.151222675648221, 34.199670805202523],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: -1549271008,
          properties: {
            id: 827794,
            time: "2006-03-11T09:00:00",
            insol: 161.73542,
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [39.151222675648221, 34.199670805202523],
                [39.151222675712766, 34.199675276071595],
                [39.151228272367668, 34.199675276015682],
                [39.151228272302838, 34.199670805146624],
                [39.151222675648221, 34.199670805202523],
              ],
            ],
          },
        },
      ],
      type: "FeatureCollection",
    };

    const timeDimension = new L.TimeDimension({
      period: "PT1H",
    });
    map.timeDimension = timeDimension;

    const player = new L.TimeDimension.Player(
      {
        transitionTime: 1000,
        loop: false,
        startOver: true,
      },
      timeDimension
    );
    const timeDimensionControlOptions = {
      player: player,
      timeDimension: timeDimension,
      position: "bottomright",
      autoPlay: true,
      minSpeed: 1,
      speedStep: 1,
      maxSpeed: 15,
      timeSliderDragUpdate: true,
    };
    const timeDimensionControl = new L.Control.TimeDimension(
      timeDimensionControlOptions
    );

    map.addControl(timeDimensionControl);

    const timeSeriesLayer = L.geoJSON(geoJson, {
      pointToLayer: (feature, latLng) => {
        if (feature.properties.hasOwnProperty("last")) {
            return new L.Marker(latLng, {
              icon: icon("Assets/Icon/Vehicle_Available.png"),
            });
        }
        // return L.circleMarker(latLng);
      },
    });

    const geojson = L.timeDimension.layer.geoJson(timeSeriesLayer, {
      updateTimeDimension: true,
      duration: "PT2M",
      updateTimeDimensionMode: "replace",
      addlastPoint: true,
    });
    geojson.addTo(map);
    // timeSeriesLayer.addTo(map)   
  }, []);
};

export default TimeDimension;
