import * as React from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  // ZoomableGroup,
  // Sphere,
  // Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import Toggle from "../components/Toggle";

function Map() {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
    .domain([0, 3700000])
    .range(["#bbcfda", "#0F00FF"]);

  const [countries, setCountries] = React.useState([]);
  const getCountries = async () => {
    const countryAPI = `http://localhost:5000/countries`;

    const response = await axios.get(countryAPI);
    setCountries(response.data);
  };

  React.useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="mainContainer">
      <div className="mainBoard">
        <Toggle id="map" />
        <div className="statMainContainer">
          <h1>World Map Refugee Density in 2021</h1>
          <div className="statOuterContainer">
            <ComposableMap
              width={750}
              height={400}
              projectionConfig={{ rotate: [-30, 0, 0], scale: 147 }}
            >
              {countries.length > 0}?
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo, index) => {
                    const isos = countries.find(
                      (s) => s.iso === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        stroke="#eff4fa"
                        strokeWidth={0.3}
                        key={index}
                        geography={geo}
                        fill={isos ? colorScale(isos["refugees"]) : "#eff4fa"}
                      />
                    );
                  })
                }
              </Geographies>
              :<p>Loading...</p>
            </ComposableMap>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
