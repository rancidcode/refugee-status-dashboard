import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCountry, addYear } from "../redux/selectedOption";
import { UserContext } from "../App";
import years from "../assets/data/years";

function Input({ mode }) {
  const selected = useSelector((state) => state.selectedOptions);

  const dispatch = useDispatch();
  const countries = React.useContext(UserContext);

  function countryOnChangeHandler(event) {
    dispatch(addCountry({ country: event.target.value }));
  }
  function yearOnChangeHandler(event) {
    dispatch(addYear({ year: event.target.value }));
  }
  if (!countries) return null;

  return (
    <>
      {mode === "country" ? (
        <select value={selected.country} onChange={countryOnChangeHandler}>
          <option value="">Select {mode}</option>
          {countries.map((country) => (
            <option key={country.id} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      ) : (
        <select value={selected.year} onChange={yearOnChangeHandler}>
          <option value="">Select {mode}</option>
          {years.map((year) => (
            <option key={year.year} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default Input;
