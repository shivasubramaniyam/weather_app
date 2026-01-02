import React from "react";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

const WeatherDashboard = () => {
  const {
    coordinates,
    // error: locationError,
    getLocation,
    // isLoading: locationLaoding,
  } = useGeoLocation();

  console.log(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // reload weather
    }
  };

  // if (locationLaoding) {
  // }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Favorite City  */}
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
