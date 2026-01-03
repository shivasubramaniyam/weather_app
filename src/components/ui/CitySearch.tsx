import { Button } from "./button";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { useLocationSearch } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  //   return export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: location, isLoading } = useLocationSearch(query);

  console.log(location);
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    // add to search histpry

    setOpen(false);
    navigate(`/city/${name}??lat=${lat}&${lon}`);
  };
  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 ms:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="  Search Cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities found.</CommandEmpty>
          )}
          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {location.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}| ${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    {location.name}
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
