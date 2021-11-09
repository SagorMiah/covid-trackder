import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

const Covid = ({ countries, country, changeCountry, casesType }) => {
  return (
    <div>
      <div className="app">
        <div className="app__header">
          <h1>COVID-10 TRACKER</h1>
          <FormControl>
            <Select variant="outlined" onChange={changeCountry} value={country}>
              <MenuItem value="wordwide">Wordwide</MenuItem>
              {countries.map((country, i) => {
                return (
                  <MenuItem key={i} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Covid;
