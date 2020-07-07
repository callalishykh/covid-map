import { fetchData, fetchCountriesLocation } from "../../api";
import React, { Component } from "react";
import pinImage from "../images/pin.png";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

class Map extends Component {
  state = {
    countries: [],
    selectedState: null,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 30.3753,
      longitude: 69.3451,
      zoom: 5,
    },
  };
  async componentDidMount() {
    const data = await fetchCountriesLocation();
    this.setState({ countries: data });
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiY2FsbGFsaXNoeWtoIiwiYSI6ImNrY2FoOGF3ajF2MGUycWxxcm5zNjluMnMifQ.5FlC5_OioAyqDqY4gMR7Pg"
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapStyle="mapbox://styles/callalishykh/ckcar32w12j4b1inyoxuhvdc6"
      >
        {this.state.countries.map((d) => (
          <Marker key={d.uid} longitude={d.long} latitude={d.lat}>
            <button
              style={{
                backgroundColor: "Transparent",
                border: "none",
                outline: "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ selectedState: d });
              }}
            >
              <img
                src={pinImage}
                alt="covid-19"
                width="15"
                height="20"
                style={{ maxHeight: "15", maxWidth: "10" }}
              ></img>
            </button>
          </Marker>
        ))}
        {this.state.selectedState ? (
          <Popup
            longitude={this.state.selectedState.long}
            latitude={this.state.selectedState.lat}
            onClose={() => {
              this.setState({ selectedState: null });
            }}
          >
            <div>
              <h4>{this.state.selectedState.provinceState}</h4>
              <p>Confirmed: {this.state.selectedState.confirmed}</p>
              <p>Cecoverd: {this.state.selectedState.recovered}</p>
              <p>Deaths: {this.state.selectedState.deaths}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    );
  }
}

export default Map;
