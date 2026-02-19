"use client";
import { useEffect, useState, useRef } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Image from "next/image";
import * as maptilersdk from "@maptiler/sdk";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street}, ${property.location.city} ${property.location.zipcode}`,
        );

        // check geocode response
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCords();
  }, [property]);

  // Initialize map when coordinates are available
  useEffect(() => {
    if (loading || lat === null || lng === null) return;

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

    // Initialize map only once
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.BRIGHT,
        center: [lng, lat],
        zoom: 14,
      });

      map.current.on("load", () => {
        new maptilersdk.Marker({ color: "#FF0088" })
          .setLngLat([lng, lat])
          .addTo(map.current);
      });
    } else {
      // If map already exists → just update center
      map.current.setCenter([lng, lat]);
    }
  }, [lat, lng, loading]);

  if (loading) return <Spinner />;
  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    <div
      ref={mapContainer}
      style={{ height: "500px", width: "100%" }}
      className="map"
    />
  );
};

export default PropertyMap;
