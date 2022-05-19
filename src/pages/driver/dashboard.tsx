import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { cookedOrders } from "../../__generated__/cookedOrders";
import { Link } from "react-router-dom";

const COOCKED_ORDERS_SUBSCRIPTIN = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className=" text-lg">🚖</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (result, status) => {
          console.log(result, status);
        }
      );
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 1,
          strokeWeight: 3,
        },
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.05,
              driverCoords.lng + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  const { data: cookedOrdersData } = useSubscription<cookedOrders>(
    COOCKED_ORDERS_SUBSCRIPTIN
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 35.58, lng: 126.95 }}
          bootstrapURLKeys={{ key: "AIzaSyC02djCnP8dNNA1zI0AvbUXIz__oi0-0UQ" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng}></Driver>
        </GoogleMapReact>
      </div>
      <div className=" max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className=" text-center text-3xl font-medium">
              New Cooked Order
            </h1>
            <h1 className=" text-center my-3 text-2xl font-medium">
              Pick it up soon @{" "}
              {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <Link
              to={`/orders/${cookedOrdersData?.cookedOrders.id}`}
              className="btn w -full mt-5 block text-center"
            >
              Accept Challenge &rarr;
            </Link>
          </>
        ) : (
          <h1 className=" text-center text-3xl font-medium">
            No Orders yet...
          </h1>
        )}
      </div>
    </div>
  );
};
