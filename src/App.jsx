import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import axios from "axios";

export const UserContext = React.createContext();

function App() {
  const [countries, setCountries] = React.useState([]);

  const getData = async () => {
    const countryURL = `http://localhost:5000/countries`;
    // const yearURL = `http://localhost:3001/years`;

    // const [countryDataResponse, yearDataResponse] = await Promise.all([
    //   axios.get(countryURL),
    //   axios.get(yearURL),
    // ]);
    const countryDataResponse = await axios(countryURL);
    setCountries(countryDataResponse.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!countries) return null;

  return (
    <UserContext.Provider value={countries}>
      <Routes>
        <Route path="/" element={<Dashboard countries={countries} />}></Route>
        <Route path="/map" element={<Map countries={countries} />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
