import { Card, CardContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./covid.css";
import Header from "./Header";
import InfoBox from "./InfoBox";
import MapMain from "./MapMain";
import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import { sortData, prettyPrintStat } from "./utill";

const Covid = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [country, setCountry] = useState("wordwide");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => {
          return {
            name: country.country,
            value: country.countryInfo.iso2,
          };
        });
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
        setMapCountries(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log(data);
      });
  }, []);

  const changeCountry = (e) => {
    const selected = e.target.value;

    const url =
      selected === "wordwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selected}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(selected);
        setCountryInfo(data);
        setMapZoom(4);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <Header
          countries={countries}
          changeCountry={changeCountry}
          country={country}
        />
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            isRed
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            isRed
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <MapMain
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
          countries={mapCountries}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Covid;
