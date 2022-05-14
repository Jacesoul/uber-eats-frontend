import React from "react";
import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          defaultZoom={20}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          bootstrapURLKeys={{ key: "AIzaSyC02djCnP8dNNA1zI0AvbUXIz__oi0-0UQ" }}
        >
          <h1>Hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};
